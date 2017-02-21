var should = require('should')
var config = require('./config')
var Client = require('../lib/client')

var client = new Client(config.apiKey, config.secretKey)

describe('BaiduPushClient::pushMsgToSingleDevice', function () {
  it('should work', function (done) {
    client.pushMsgToSingleDevice(config.channel_ids[0], {
      title: 'hello',
      description: 'world'
    }, {
      msg_type: 1
    }, function (err, data) {
      should.ifError(err)
      done()
    })
  })
})
