const requests = require('superagent');
const Web3 = require('web3');
const Big = require('big.js');
const {ecsign, privateToAddress} = require('ethereumjs-util');
const {Transaction} = require('ethereumjs-tx');
const DCN_ABI = require('../abi/dcnabi.json');
const ERC20_ABI = require('../abi/erc20abi.json');
const GatewayConnection = require('./gateway_connection');
const {EventEmitter} = require('events');
const Reports = require('./messages/reports');
const MapReport = require('./report_mappings');

const SIG_HASH_HEADER = '0x1901';
const DCN_HEADER_HASH = '0x6c1a0baa584339032b4ed0d2fdb53c23d290c0b8a7da5a9e05ce919faa986a59';
const UPDATE_LIMIT_TYPE_HASH = '0xbe6b685e53075dd48bdabc4949b848400d5a7e53705df48e04ace664c3946ad2';
const DCN_ADDRESS = '0x84f6451efe944ba67bedb8e0cf996fa1feb4031d';

const MAX_GAS_PRICE = 30000000000;
const MIN_GAS_PRICE = 2000000000;

const NO_OP = () => {
};

const TRADING_LIMIT_PARAMETERS = [
  {name: 'dcn_id', type: 'uint32'},
  {name: 'user_id', type: 'uint64'},
  {name: 'exchange_id', type: 'uint32'},
  {name: 'quote_asset_id', type: 'uint32'},
  {name: 'base_asset_id', type: 'uint32'},
  {name: 'fee_limit', type: 'uint64'},
  {name: 'min_quote_qty', type: 'int64'},
  {name: 'min_base_qty', type: 'int64'},
  {name: 'long_max_price', type: 'uint64'},
  {name: 'short_min_price', type: 'uint64'},
  {name: 'limit_version', type: 'uint64'},
  {name: 'quote_shift', type: 'int96'},
  {name: 'base_shift', type: 'int96'},
];

const TRADING_LIMIT_TYPES = TRADING_LIMIT_PARAMETERS.map(item => item.type);

/*
 * TODO
 * - support multiple keys (withdraw and trade)
 * - break out signing logic into own class to support other wallets
 */

class MerkleX extends EventEmitter {
  constructor(settings) {
    super();

    settings = settings || {};
    this._rest_uri = settings.rest_uri || 'https://api.merklex.io';
    this._web3 = new Web3(settings.web3_provider || 'https://cloudflare-eth.com');
    this._erc20_assets = {};

    if (!settings.trade_private_key) {
      throw new Error('trade_price_key require');
    }

    if (!settings.user_id && settings.user_id !== 0) {
      throw new Error('user_id required');
    }

    const private_key = settings.trade_private_key.startsWith('0x')
      ? settings.trade_private_key.substr(2)
      : settings.trade_private_key;

    this._priv_key = Buffer.from(private_key, 'hex');
    this._address = privateToAddress(this._priv_key).toString('hex');
    this._user_id = settings.user_id;
    this._dcn = new this._web3.eth.Contract(DCN_ABI, DCN_ADDRESS);
    this._gateway = new GatewayConnection(settings.gateway_uri);

    this._prepared_markets = {};
    this._resting_orders = {};
    this._balances = {};

    this._gateway.on('connect', () => {
      this.assets().then(() => {
        /* auth on connection */
        this._accessKey()
          .then(access_key => {
            this._gateway.send({
              type: 'OpenTradeSession',
              user_id: this._user_id,
              access_key,
            });
          });
      });

      this._resend_iid = setInterval(this._handleOrderResends.bind(this), 300);
    });

    this._gateway.on('disconnect', () => {
      clearInterval(this._resend_iid);
    });

    this._gateway.on('report', this._handleReport.bind(this));
  }

  connect() {
    this._next_order_token_p = MerkleX._waitPromise();

    return this.loadMarkets()
      .then(() => this._accessKey())
      .then(() => this._gateway.connect())
      .then(() => this._next_order_token_p)
      .then(() => this);
  }

  disconnect() {
    return this._gateway.disconnect();
  }

  newOrder(details) {
    if (!details.market && (!details.quote_asset_id || !details.base_asset_id)) {
      return MerkleX._newOrderError(details, 'missing .market');
    }

    if (!details.quantity) {
      return MerkleX._newOrderError(details, 'missing .quantity');
    }

    if (!details.price) {
      return MerkleX._newOrderError(details, 'missing .price');
    }

    if (!details.is_buy && details.is_buy !== false) {
      return MerkleX._newOrderError(details, 'missing .is_buy');
    }

    const market = this._markets.find(m =>
      m.symbol === details.market
      || (m.quote_asset_id === details.quote_asset_id && m.base_asset_id === details.base_asset_id)
    );

    if (!market) {
      return MerkleX._newOrderError(details, 'could not find market');
    }

    const order_token = this._getNextOrderToken();

    const order = {
      ...details,
      status: 'prepared',
      market: market.symbol,
      user_id: this._user_id,
      quantity: details.quantity,
      quantity_removed: '0',
      price: details.price,
      quote_asset_id: market.quote_asset_id,
      base_asset_id: market.base_asset_id,
      order_token,
      fees: '0',
      filled_quantity: '0',
      filled_value: '0',

      request: {
        type: 'NewOrder',
        quantity: Big(details.quantity).mul(Big(10).pow(market.base_decimals)).toFixed(0),
        price: Big(details.price).mul(Big(10).pow(market.price_decimals)).toFixed(0),
        is_buy: details.is_buy,
        user_id: this._user_id,
        quote_asset_id: market.quote_asset_id,
        base_asset_id: market.base_asset_id,
        order_token,
        replace_order_token: details.replace_order_token || 0
      }
    };

    this._resting_orders[order.order_token] = order;

    order.result = new Promise((resolve, reject) => {
      order.status = 'sending';
      this.prepareMarket(market.symbol).then(() => {
        order.status = 'pending';
        order._send_resolve = resolve;
        order._send_reject = reject;
        order._send_time = Date.now();
        this._send(order.request);
      });
    }).then(() => {
      order.status = 'accepted';
      return order;
    }).catch(err => {
      order.rejected = err.rejected;
      throw err;
    });

    order.cancel = () => {
      if (order.status === 'done') {
        return Promise.reject('Order is done');
      }

      if (order._cancel_p) {
        return order._cancel_p;
      }

      order._cancel_p = new Promise((resolve, reject) => {
        order.status = 'canceling';
        order._done_resolve = resolve;
        order._done_reject = reject;

        this._send({
          type: 'CancelOrder',
          user_id: order.user_id,
          order_token: order.order_token,
          leaves_quantity: 0,
        });
      });

      return order._cancel_p;
    };

    return order;
  }

  prepareMarket(symbol, base_asset_id) {
    let market;
    if (base_asset_id !== undefined) {
      const quote_asset_id = symbol;
      market = this._markets.find(m =>
        m.quote_asset_id === quote_asset_id
        && m.base_asset_id === base_asset_id
      );
    } else {
      market = this._markets.find(m => m.symbol === symbol);
    }

    if (!market) {
      return Promise.reject(new Error('market not found'));
    }

    if (this._prepared_markets[market.symbol]) {
      return this._prepared_markets[market.symbol];
    }

    const p = MerkleX._waitPromise();
    this._prepared_markets[market.symbol] = p;
    return p;
  }

  _handleOrderResends() {
    const now = Date.now();
    Object.keys(this._resting_orders).forEach(order_token => {
      const order = this._resting_orders[order_token];
      if (order.status !== 'pending') {
        return;
      }

      if (now - order._send_time > 100) {
        this._send(order.request);
        order._send_time = Date.now();
      }
    });
  }

  _handleReport(report) {
    report = MapReport(this._assets, this._markets, report);
    this.emit('report', report);

    switch (report.header.type_id) {
      case Reports.Types.NEXT_ORDER_TOKEN: {
        this._next_order_token = report.next_order_token;

        if (this._next_order_token_p) {
          this._next_order_token_p._resolve();
        } else {
          this._next_order_token_p = Promise.resolve();
          this._next_order_token_p._resolve = NO_OP;
        }

        break;
      }
      case Reports.Types.MARKET_READY: {
        const market = this._markets.find(m =>
          m.quote_asset_id === report.quote_asset_id
          && m.base_asset_id === report.base_asset_id
        );

        if (market) {
          if (this._prepared_markets[market.symbol]) {
            this._prepared_markets[market.symbol]._resolve();
          } else {
            const p = Promise.resolve();
            p._resolve = NO_OP;
            this._prepared_markets[market.symbol] = p;
          }
        }

        break;
      }
      case Reports.Types.ORDER_DETAILS: {
        if (!this._resting_orders[report.order_token]) {
          this._resting_orders[report.order_token] = {
            status: 'resting',
            market: report.market,
            quantity: report.quantity,
            quantity_removed: '0',
            user_id: report.user_id,
            price: report.price,
            quote_asset_id: report.quote_asset_id,
            base_asset_id: report.base_asset_id,
            order_token: report.order_token,
            fees: '0',
            filled_quantity: '0',
            filled_value: '0',
            is_buy: report.is_buy,
          };
        }

        break;
      }
      case Reports.Types.MARKET_STATE_DETAILS: {
        const market = this._markets.find(m =>
          m.quote_asset_id === report.quote_asset_id
          && m.base_asset_id === report.base_asset_id
        );

        if (market) {
          this._prepareMarket(market);
        }
        break;
      }
      case Reports.Types.ORDER_ACCEPTED: {
        const order = this._resting_orders[report.order_token];
        if (order) {
          order.status = 'accepted';
          order._accepted_at = Date.now();
          order.replace_order_token = report.existing_order_token;

          if (order._send_resolve) {
            order._send_resolve(order);
          }
        }
        break;
      }
      case Reports.Types.ORDER_REJECTED: {
        const order = this._resting_orders[report.order_token];
        if (order) {
          delete this._resting_orders[report.order_token];

          Object.assign(order, report);
          order.status = 'rejected';
          order._rejected_at = Date.now();

          if (order._send_reject) {
            const e = new Error(report.reason);
            e.reason = report;

            order._send_reject(e);
          }
        }
        break;
      }
      case Reports.Types.ORDER_RESTING: {
        const order = this._resting_orders[report.order_token];
        if (order) {
          order.status = 'resting';
          order._resting_at = Date.now();
          order.quantity = report.quantity_resting;
          order.quantity_removed = report.quantity_removed;
        }

        if (report.is_buy) {
          const b = this._balances[report.quote_asset_id];
          if (b) {
            const value = Big(report.quantity_resting).mul(report.price);

            this._balances[report.quote_asset_id] = {
              balance: b.balance,
              hold: Big(b.hold).add(value) + '',
              available: Big(b.available).sub(value) + '',
            };
          }
        } else {
          const b = this._balances[report.base_asset_id];
          if (b) {
            this._balances[report.base_asset_id] = {
              balance: b.balance,
              hold: Big(b.hold).add(report.quantity_resting) + '',
              available: Big(b.available).sub(report.quantity_resting) + '',
            };
          }
        }

        break;
      }
      case Reports.Types.ORDER_DONE: {
        const order = this._resting_orders[report.order_token];
        if (order) {
          delete this._resting_orders[report.order_token];

          order.status = 'done';
          order._done_at = Date.now();
          order.quantity = '0';
          order.quantity_removed = Big(order.quantity_removed).add(report.quantity_removed) + '';

          if (order._done_resolve) {
            order._done_resolve(order);
          }
        }

        if (report.is_buy) {
          const b = this._balances[report.quote_asset_id];

          if (b) {
            const value = Big(report.quantity_removed).mul(report.price);

            this._balances[report.quote_asset_id] = {
              balance: b.balance,
              hold: Big(b.hold).sub(value) + '',
              available: Big(b.available).add(value) + '',
            };
          }
        } else {
          const b = this._balances[report.base_asset_id];

          if (b) {
            this._balances[report.base_asset_id] = {
              balance: b.balance,
              hold: Big(b.hold).sub(report.quantity_removed) + '',
              available: Big(b.available).add(report.quantity_removed) + '',
            };
          }
        }

        break;
      }
      case Reports.Types.ORDER_MODIFIED: {
        const order = this._resting_orders[report.order_token];
        if (order) {
          order.status = 'done';
          order.quantity = report.quantity_remaining;
          order.quantity_removed = Big(order.quantity_removed).add(report.quantity_removed) + '';
        }

        if (report.is_buy) {
          const b = this._balances[report.quote_asset_id];
          if (b) {
            const value = Big(report.quantity_removed).mul(report.price);

            this._balances[report.quote_asset_id] = {
              balance: b.balance,
              hold: Big(b.hold).sub(value) + '',
              available: Big(b.available).add(value) + '',
            };
          }
        } else {
          const b = this._balances[report.base_asset_id];
          if (b) {
            this._balances[report.base_asset_id] = {
              balance: b.balance,
              hold: Big(b.hold).sub(report.quantity_removed) + '',
              available: Big(b.available).add(report.quantity_removed) + '',
            };
          }
        }

        break;
      }
      case Reports.Types.MATCH: {

        const order = this._resting_orders[report.order_token];
        if (order) {
          order.quantity = Big(order.quantity).sub(report.quantity) + '';
          order.fees = Big(order.fees).add(report.fees) + '';
          order.filled_quantity = Big(order.filled_quantity).add(report.quantity) + '';
          order.filled_value = Big(order.filled_value).add(report.cost) + '';
        }

        if (report.is_buy) {
          let b = this._balances[report.quote_asset_id];
          if (b) {
            this._balances[report.quote_asset_id] = {
              balance: Big(b.balance).sub(report.cost) + '',
              hold: Big(b.hold).sub(report.cost) + '',
              available: b.available + '',
            };
          }

          b = this._balances[report.base_asset_id];
          if (b) {
            this._balances[report.base_asset_id] = {
              balance: Big(b.balance).add(report.quantity) + '',
              hold: b.hold,
              available: Big(b.available).add(report.quantity) + '',
            };
          }
        } else {
          let b = this._balances[report.quote_asset_id];
          if (b) {
            this._balances[report.quote_asset_id] = {
              balance: Big(b.balance).add(report.cost) + '',
              hold: b.hold,
              available: Big(b.available).add(report.cost) + '',
            };
          }

          b = this._balances[report.base_asset_id];
          if (b) {
            this._balances[report.base_asset_id] = {
              balance: Big(b.balance).sub(report.quantity) + '',
              hold: Big(b.hold).sub(report.quantity) + '',
              available: b.available,
            };
          }
        }

        break;
      }
      case Reports.Types.CURRENT_BALANCE: {
        this._balances[report.asset_id] = {
          symbol: report.asset,
          balance: report.balance,
          hold: report.hold,
          available: Big(report.balance).sub(report.hold) + '',
        };
        break;
      }
    }
  }

  get orders() {
    return Object.keys(this._resting_orders).map(order_token => this._resting_orders[order_token]);
  }

  get trade_address() {
    return this._address;
  }

  getBalances() {
    return Object.keys(this._balances).map(asset_id => {
      return {
        symbol: this._assets[asset_id].symbol,
        ...this._balances[asset_id],
      };
    });
  }

  queryOrderToken() {
    send({
      type: 'QueryOrderToken',
      user_id: this._user_id,
    });
  }

  _prepareMarket(market) {
    this._send({
      type: 'PrepareMarket',
      user_id: this._user_id,
      quote_asset_id: market.quote_asset_id,
      base_asset_id: market.base_asset_id,
    });
  }

  static _newOrderError(details, message) {
    return {
      ...details,
      status: 'error',
      error: message,
      result: Promise.reject(new Error(message)),
    };
  }

  static _waitPromise() {
    let resolve;
    const p = new Promise(_resolve => {
      resolve = _resolve;
    });

    p._resolve = () => {
      p._resolve = NO_OP;
      resolve();
    };

    return p;
  }

  cancelOrder(order_token) {
    this._send({
      type: 'CancelOrder',
      user_id: this._user_id,
      order_token,
      leaves_quantity: 0,
    });
  }

  _getNextOrderToken() {
    return this._next_order_token++;
  }

  _send(request) {
    this._gateway.send(request);
  }

  loadMarkets() {
    if (this._markets_p) {
      return this._markets_p;
    }

    const p = this._markets_p = requests
      .get(this._rest_uri + '/v1/markets')
      .then(res => res.body)
      .then(res => {
        this._markets = res;
        if (p === this._markets_p) {
          this._markets_p = null;
        }
        return res;
      })
      .catch(err => {
        if (p === this._markets_p) {
          this._markets_p = null;
        }
      });

    return p;
  }

  assets() {
    if (this._assets_p) {
      return this._assets_p;
    }

    const p = this._assets_p = requests
      .get(this._rest_uri + '/v1/assets')
      .then(res => res.body)
      .then(res => {
        this._assets = res;
        return res;
      })
      .catch(err => {
        if (p == this._assets_p) {
          this._assets_p = null;
        }
      });

    return p;
  }

  updateTradingLimit(input) {
    return this._accessKey().then(key => {
      const auth_header = `addr_code ${key} ${this._user_id}`;

      return this.markets()
        .then(markets => markets.find(m =>
          m.symbol === input.market || (
          m.quote_asset_id === +input.quote_asset_id
          && m.base_asset_id === +input.base_asset_id)
        ))
        .then(market => {
          return requests
            .get(this._rest_uri + '/v1/trade/limit/' + market.symbol)
            .set('Authorization', auth_header)
            .then(res => res.body)
            .then(trading_limit => {
              const quote_scale = Big(10).pow(market.quote_decimals);
              const base_scale = Big(10).pow(market.base_decimals);
              const price_scale = Big(10).pow(8);

              const formatted_data = {
                dcn_id: 0,
                user_id: this._user_id,
                exchange_id: 0,
                quote_asset_id: market.quote_asset_id,
                base_asset_id: market.base_asset_id,
                fee_limit: Big(input.fee_limit).mul(quote_scale).toFixed(0),
                min_quote_qty: Big(input.min_quote_qty).mul(quote_scale).toFixed(0),
                min_base_qty: Big(input.min_base_qty).mul(base_scale).toFixed(0),
                long_max_price: Big(input.long_max_price).mul(price_scale).toFixed(0),
                short_min_price: Big(input.short_min_price).mul(price_scale).toFixed(0),
                limit_version: 22, //'' + trading_limit.next_limit_version,
                quote_shift: Big(input.quote_shift || '0').mul(quote_scale).toFixed(0),
                base_shift: Big(input.base_shift || '0').mul(base_scale).toFixed(0),
              };

              const data_hash = this._tradingLimitHash(formatted_data).substr(2);
              formatted_data.signature = this._sigToStr(ecsign(Buffer.from(data_hash, 'hex'), this._priv_key));

              return requests.post(this._rest_uri + '/v1/trade/limit')
                .set('Authorization', auth_header)
                .send(formatted_data)
                .then(data => {
                  return input;
                });
            });
        });
    });
  }

  withdraw(asset_id, quantity, to_address) {
    let erc20_decimals;

    return this._getAsset(asset_id)
      .then(asset => {
        if (!asset) {
          throw new Error('failed to get asset with id ' + asset_id);
        }

        erc20_decimals = asset.erc20_decimals;
        return Big(quantity).mul(Big(10).pow(asset.decimals)).toFixed(0);
      })
      .then(amount => this._withdrawToDCN(asset_id, amount))
      .then(this.waitForTx.bind(this))
      .then(() => {
        const erc20_amount = Big(quantity).mul(Big(10).pow(+erc20_decimals)).toFixed(0);
        return this._userWithdraw(asset_id, to_address, erc20_amount);
      });
  }

  deposit(asset_id, quantity) {
    return this._getAsset(asset_id)
      .then(asset => {
        const erc20_amount = Big(quantity).mul(Big(10).pow(+asset.erc20_decimals)).toFixed(0);
        const deposit_amount = Big(quantity).mul(Big(10).pow(asset.decimals)).toFixed(0);

        return this._getERC20(asset_id).then(erc20 => {
          return erc20.methods.allowance(this._address, DCN_ADDRESS).call()
            .then(erc20_allowance => {
              if (Big(erc20_allowance).lt(erc20_amount)) {
                const encoded = erc20.methods.approve(DCN_ADDRESS, erc20_amount).encodeABI();

                return this
                  ._txSign({
                    to: asset.contract_address,
                    value: 0,
                    data: encoded,
                  })
                  .then(this._submitTx.bind(this))
                  .then(this.waitForTx.bind(this));
              }

              return Promise.resolve();
            })
            .then(() => {
              const encoded = this._dcn.methods.user_deposit_to_session(this._user_id, 0, asset_id, deposit_amount).encodeABI();

              return this
                ._txSign({
                  to: DCN_ADDRESS,
                  value: 0,
                  data: encoded,
                })
                .then(this._submitTx.bind(this));
            });
        });
      });
  }

  waitForTx(tx_hash) {
    return this._tillResult(() => {
      return this._web3.eth.getTransactionReceipt(tx_hash)
        .then(res => {
          if (res && res.blockNumber) {
            return res;
          }
          return null;
        })
    });
  }


  _getERC20(asset_id) {
    let erc20 = this._erc20_assets[asset_id];
    if (erc20) {
      return erc20;
    }

    erc20 = this._getAsset(asset_id)
      .then(asset => new this._web3.eth.Contract(ERC20_ABI, asset.contract_address));

    this._erc20_assets[asset_id] = erc20;
    return erc20;
  }

  _getAsset(asset_id) {
    return this.assets()
      .then(assets => assets.find(a => a.id === asset_id))
      .then(asset => {
        if (!asset) {
          throw new Error('failed to get asset with id ' + asset_id);
        }

        return asset;
      });
  }

  _reloadNextNonce() {
    if (this._next_nonce_p) {
      return this._next_nonce_p;
    }

    const p = this._next_nonce_p = this._web3.eth.getTransactionCount(this._address).then(count => {
      this._next_nonce = count;
      if (p === this._next_nonce_p) {
        this._next_nonce_p = null;
      }
      return this._next_nonce;
    })
      .catch(err => {
        if (p === this._next_nonce_p) {
          this._next_nonce_p = null;
        }
      });

    return p;
  }

  _getAndIncNonce() {
    if (!this._next_nonce) {
      return this._reloadNextNonce()
        .then(() => this._next_nonce++);
    }

    return Promise.resolve(this._next_nonce++);
  }

  _tradingLimitHash(data) {
    const values = [];
    TRADING_LIMIT_PARAMETERS.forEach(prop => {
      values.push(data[prop.name]);
    });

    const to_hash = UPDATE_LIMIT_TYPE_HASH
      + this._web3.eth.abi.encodeParameters(TRADING_LIMIT_TYPES, values).substr(2);
    const data_hash = this._web3.utils.sha3(to_hash);

    const data_hash_final = SIG_HASH_HEADER
      + DCN_HEADER_HASH.substr(2)
      + data_hash.substr(2);
    return this._web3.utils.sha3(data_hash_final);
  }

  _sigToStr(sig) {
    if (sig.v < 27) {
      sig.v += 27;
    }
    return '0x' + sig.r.toString('hex') + sig.s.toString('hex') + sig.v.toString(16);
  }

  _accessKey() {
    if (this._auth_p) {
      return this._auth_p;
    }

    const timestamp = Date.now();

    const to_hash = '0x12f7bbf3eb51b2e8921e419263b655d39cf3b215adfea54a048fe995dcad9c07'
      + this._web3.eth.abi.encodeParameters(['uint64'], [timestamp]).substr(2);
    const data_hash = this._web3.utils.sha3(to_hash);

    const data_hash_final = SIG_HASH_HEADER
      + '508b901bd3a46af4d5ad4f6b23ecb4f4a5c46b2d92d04cc68e8ff425e0779c1a'
      + data_hash.substr(2);
    const auth_hash = this._web3.utils.sha3(data_hash_final);

    const signature = this._sigToStr(ecsign(Buffer.from(auth_hash.substr(2), 'hex'), this._priv_key));
    const payload = {
      address: this._address,
      signature,
      timestamp
    };

    const p = this._auth_p = requests.post(this._rest_uri + '/v1/auth')
      .send(payload)
      .then(res => res.text)
      .catch(err => {
        if (p === this._auth_p) {
          this._auth_p = null;
        }
        throw err;
      });

    return p;
  }

  _withdrawToDCN(asset_id, quantity) {
    return this._accessKey()
      .then(key => {
        const auth_header = `addr_code ${key} ${this._user_id}`;

        return requests.post(this._rest_uri + '/v1/trade/withdraws')
          .set('Authorization', auth_header)
          .send({
            asset_id,
            quantity,
          })
          .then(res => res.body)
          .then(request_id => {

            return this._tillResult(() => {
              return requests
                .get(this._rest_uri + '/v1/trade/withdraws/' + request_id)
                .set('Authorization', auth_header)
                .then(res => res.body)
                .then(res => {
                  if (res === 'failed') {
                    throw new Error('insufficient funds');
                  }

                  if (res.indexOf('0x') == 0) {
                    return res;
                  }

                  return null;
                });
            });

          });
      });
  }

  _tillResult(fn, timeout) {
    timeout = timeout || 500;

    return new Promise((resolve, reject) => {
      const attempt = () => {
        fn().then(res => {
          if (res) {
            return resolve(res);
          }

          setTimeout(attempt, timeout);
        })
          .catch(reject);
      };

      attempt();
    });
  }

  _txSign(info) {
    const tx_info = {
      ...info,
    };

    if (!tx_info.to) {
      return Promise.reject(new Error('missing to'));
    }

    if (!tx_info.value && tx_info.value !== 0) {
      return Promise.reject(new Error('missing value'));
    }

    if (!tx_info.data) {
      return Promise.reject(new Error('missing data'));
    }

    const to_load = [];
    if (!tx_info.gasPrice) {
      to_load.push(this._web3.eth.getGasPrice().then(price => {
        price = +price;

        if (price > MAX_GAS_PRICE) {
          price = MAX_GAS_PRICE;
        } else if (price < MIN_GAS_PRICE) {
          price = MIN_GAS_PRICE;
        }

        tx_info.gasPrice = price;
      }));
    }

    let load_nonce;
    if (!tx_info.nonce) {
      load_nonce = this._getAndIncNonce().then(nonce => {
        tx_info.nonce = nonce;
      });
      to_load.push(load_nonce);
    } else {
      load_nonce = Promise.resolve();
    }

    if (!tx_info.gasLimit) {
      const load_gas_limit = load_nonce
        .then(() => {
          return this._web3.eth.estimateGas({
            ...tx_info,
            gasLimit: 1000000,
            from: this._address,
          });
        })
        .then(gas_limit => {
          tx_info.gasLimit = +Big(gas_limit).mul('1.5').toFixed(0);
        });

      to_load.push(load_gas_limit);
    }

    return Promise.all(to_load)
      .then(() => {
        const tx = new Transaction(tx_info);
        tx.sign(this._priv_key);
        return '0x' + tx.serialize().toString('hex');
      });
  }

  _submitTx(raw_data) {
    return new Promise((resolve, reject) => {
      this._web3.eth.sendSignedTransaction(raw_data, function (err, hash) {
        if (err) {
          return reject(err);
        }
        resolve(hash);
      })
    });
  }

  _userWithdraw(asset_id, to_address, amount) {
    const encoded = this._dcn.methods.user_withdraw(this._user_id, asset_id, to_address, amount).encodeABI();

    return this
      ._txSign({
        to: DCN_ADDRESS,
        value: 0,
        data: encoded,
        gasLimit: 100000,
      })
      .then(this._submitTx.bind(this));
  }
}

module.exports = MerkleX;
