const Reports = require('./messages/reports');
const Big = require('big.js');
const BigInteger = require('big-integer');

const REPORT_MAPPINGS = {
  [Reports.Types.Match]: [
    { asset_id_key: 'quote_asset_id', asset_key: 'quote_asset', modify_keys: ['cost', 'fees'] },
    { asset_id_key: 'base_asset_id',  asset_key: 'base_asset', modify_keys: ['quantity'] },
    { is_price: true, market_key: 'market', modify_keys: ['price'] },
  ],
  [Reports.Types.ORDER_DONE]: [
    { asset_id_key: 'base_asset_id', asset_key: 'base_asset', modify_keys: ['quantity_removed'] },
    { is_price: true, market_key: 'market', modify_keys: ['price'] },
  ],
  [Reports.Types.ORDER_ACCEPTED]: [
    { asset_id_key: 'base_asset_id', asset_key: 'base_asset', modify_keys: ['quantity'] },
    { is_price: true, market_key: 'market', modify_keys: ['price'] },
  ],
  [Reports.Types.ORDER_RESTING]: [
    { asset_id_key: 'base_asset_id', asset_key: 'base_asset', modify_keys: ['quantity_removed', 'quantity_resting'] },
    { is_price: true, market_key: 'market', modify_keys: ['price'] },
  ],
  [Reports.Types.ORDER_MODIFIED]: [
    { asset_id_key: 'base_asset_id', asset_key: 'base_asset', modify_keys: ['quantity_removed', 'quantity_resting'] },
    { is_price: true, market_key: 'market', modify_keys: ['price'] },
  ],
  [Reports.Types.DEPOSIT_APPLIED]: [
    { asset_id_key: 'asset_id', asset_key: 'asset', modify_keys: ['current_balance'] },
  ],
  [Reports.Types.ORDER_DETAILS]: [
    { asset_id_key: 'base_asset_id', asset_key: 'base_asset', modify_keys: ['quantity', 'original_quantity'] },
    { is_price: true, market_key: 'market', modify_keys: ['price'] },
  ],
  [Reports.Types.CURRENT_BALANCE]: [
    { asset_id_key: 'asset_id', asset_key: 'asset', modify_keys: ['balance', 'hold'] },
  ],
  [Reports.Types.MARKET_STATE_DETAILS]: [
    { asset_id_key: 'quote_asset_id', asset_key: 'quote_asset', modify_keys: [
      'fee_limit',
      'quote_qty',
      'quote_market_hold',
      'min_quote_qty',
    ]},
    { asset_id_key: 'base_asset_id', asset_key: 'base_asset', modify_keys: [
      'base_qty',
      'base_market_hold',
      'min_base_qty',
    ]},
    { decimals: 8, modify_keys: ['long_max_price', 'short_min_price'] },
    { is_shift: true, asset_id_key: 'quote_asset_id',
      major: 'quote_shift_qty_major',
      minor: 'quote_shift_qty_minor',
      result: 'quote_shift',
    },
    { is_shift: true, asset_id_key: 'base_asset_id',
      major: 'base_shift_qty_major',
      minor: 'base_shift_qty_minor',
      result: 'base_shift',
    },
    { is_price: true, market_key: 'market', modify_keys: [] },
  ],
  [Reports.Types.WITHDRAW_RESULT]: [
    { asset_id_key: 'asset_id', asset_key: 'asset', modify_keys: ['quantity'] },
  ],
};

function MapReport(assets, markets, report) {
  const mapping = REPORT_MAPPINGS[report.header.type_id];

  if (!mapping) {
    return report;
  }

  const result = {
    ...report,
  };

  for (let i = 0; i < mapping.length; ++i) {
    const rule = mapping[i];

    if (rule.is_price) {
      const quote_asset_id = result['quote_asset_id'];
      const base_asset_id = result['base_asset_id'];

      const market = markets.find(m =>
        m.quote_asset_id === quote_asset_id && m.base_asset_id === base_asset_id);

      if (!market) {
        console.error('could not find market with ', quote_asset_id, base_asset_id);
        return null;
      }

      rule.modify_keys.forEach(key => {
        Big.DP = market.price_decimals;
        result[key] = Big(result[key]).div(Big(10).pow(Big.DP)).toFixed(Big.DP);
      });

      if (rule.market_key) {
        result[rule.market_key] = market.symbol;
      }

      continue;
    }

    if (rule.decimals) {
      Big.DP = rule.decimals;
    }
    else {
      const asset = assets.find(a => a.id === result[rule.asset_id_key]);
      if (!asset) {
        console.error('could not find asset with id', rule, result, result[rule.asset_id_key]);
        return null;
      }

      if (rule.asset_key) {
        result[rule.asset_key] = asset.symbol.trim();
      }

      Big.DP = asset.decimals;
    }

    if (rule.is_shift) {
      const shift = build_shift(result[rule.major], result[rule.minor]);
      result[rule.result] = Big(shift).div(Big(10).pow(Big.DP)).toFixed(Big.DP);
      continue;
    }

    rule.modify_keys.forEach(key => {
      result[key] = Big(result[key]).div(Big(10).pow(Big.DP)).toFixed(Big.DP);
    });
  }

  return result;
}

function build_shift(major, minor) {
  return BigInteger(major + '').shiftLeft(64).or(minor + '') + '';
}

module.exports = MapReport;
