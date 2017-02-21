var config = require('../test/config')
var Client = require('../lib/client')

var client = new Client(config.apiKey, config.secretKey)

// client.queryStatisticDevice(config.print);

// client.queryStatisticTopic('default', config.print);

// client.queryMsgStatus(['217794009626030970', '6038946256262438707'], config.print);

client.queryTimerList(config.print)
client.queryTopicList(config.print)
