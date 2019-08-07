const MerkleX = require('../lib/merklex');
const keys = require('./keys');

const merklex = new MerkleX(keys);

// merklex.on('report', report => {
//   if (report.header.type_id === 4) {
//     return;
//   }
//   console.log(JSON.stringify(report, null, 2));
// });

merklex.connect().then(() => {
  return merklex.newOrder({
    market: 'ETH-DAI',
    is_buy: false,
    price: '300',
    quantity: '0.1',
  }).result;
}).then(order => {
  return order.cancel();
}).then(() => {
  console.log('balances', merklex.getBalances());
});
