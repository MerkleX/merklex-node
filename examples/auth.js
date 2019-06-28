const { GatewayConnection } = require('../');

const USER_ID = 0;
const ACCESS_KEY = '';

const gateway = new GatewayConnection();
gateway.on('connect', () => {
  console.log('connected');

  gateway.send({
    type: 'OpenTradeSession',
    user_id: USER_ID,
    access_key: ACCESS_KEY,
  });
});

gateway.on('report', report => {
  console.log('%j', report);
});

gateway.on('disconnect', () => {
  console.log('closed');
});
