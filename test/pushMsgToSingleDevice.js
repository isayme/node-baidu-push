var config = require('./config');
var Client = require('../lib/client');

client = new Client(config.apiKey, config.secretKey);

client.pushMsgToSingleDevice(config.channel_ids[0], {
  title: 'hello',
  description: 'world'
}, {
  msg_type: 1
}, config.print);
