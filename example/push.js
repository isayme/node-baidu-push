var should = require('should')
var config = require('../test/config')
var Client = require('../lib/client')

client = new Client(config.apiKey, config.secretKey)

var msg = {
  title: '测试 标题',
  description: '测试 描述'
}

client.pushMsgToTag('tagName', msg, {msg_type: 1}, config.print)
