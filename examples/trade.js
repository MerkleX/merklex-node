const MerkleX = require('../lib/merklex');
const keys = require('./keys');

const merklex = new MerkleX(keys);

merklex.connect();
merklex.on('report', report => {
  if (report.header.type_id === 4) {
    return;
  }
  console.log(JSON.stringify(report, null, 2));
});

let old_token = 0;

setInterval(() => {
  merklex.newOrder({
    replace_order_token: old_token,
    market: 'WETH-DAI',
    is_buy: true,
    price: '260',
    quantity: '0.12345678',
  }).then(report => {
    old_token = report.order_token;
  }).catch(err => {});
}, 400);

// actions.deposit(3, '3.9').then(tx => {
//   console.log('waiting for deposit', tx);
//   return actions.waitForTx(tx);
// })
// .then(() => {
//   return actions.withdraw(3, '1.0', actions.trade_address)
//     .then(tx => {
//       console.log('wait for withdraw', tx);
//       return actions.waitForTx(tx);
//     });
// })
// .then(() => {
//   return actions.deposit(3, '0.1').then(tx => {
//     console.log('waiting for deposit', tx);
//     return actions.waitForTx(tx);
//   });
// })
// .then(() => {
//   console.log('that was a lot, all done :)');
// });


// actions.updateTradingLimit({
//   dcn_id: '1',
//   user_id: '0',
//   exchange_id: '0',
//   quote_asset_id: '1',
//   base_asset_id: '3',
//   fee_limit: '1000',
//   min_quote_qty: '-100',
//   min_base_qty: '-100',
//   long_max_price: '100000',
//   short_min_price: '1000',
//   limit_version: '1',
//   quote_shift: '0',
//   base_shift: '0',
// });
