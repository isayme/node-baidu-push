var config = require('./config');
var Client = require('../lib/client');

client = new Client(config.apiKey, config.secretKey);

client.pushMsgToAll({
  title: 'hello',
  description: 'world all'
}, {
  msg_type: 1
}, config.print);
