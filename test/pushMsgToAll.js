var should = require('should')
var nock = require('nock')
var config = require('./config')
var Client = require('../lib/client')

var client = new Client(config.apiKey, config.secretKey)

describe('BaiduPushClient::pushMsgToAll', function () {
  it('should work', function (done) {
    nock('http://api.push.baidu.com')
      .post('/rest/3.0/push/all')
      .reply(200, {
        request_id: 123456789,
        response_params: {
          msg_id: 24234532453245,
          send_time: 1427174155
        }
      })

    client.pushMsgToAll({
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
