var should = require('should')
var config = require('./config')
var Client = require('../lib/client')

var client = new Client(config.apiKey, config.secretKey)

describe('queryMsgStatus', function () {
  it('should return ok when query one msg_id', function (done) {
    client.queryMsgStatus('217794009626030979', function (err, data) {
      should(data.total_num).equal(1)
      done(err)
    })
  })

  it('should return ok when query two msg_id', function (done) {
    client.queryMsgStatus(['217794009626030979', '6038946256262438707'], function (err, data) {
      should(data.total_num).equal(2)
      done(err)
    })
  })
})

describe('queryTimerList', function () {
  it('should return ok', function (done) {
    client.queryTimerList(function (err, data) {
      should(data.result).Array()
      done(err)
    })
  })
})

describe('queryTopicList', function () {
  it('should return ok', function (done) {
    client.queryTopicList(function (err, data) {
      should(data.result).Array()
      done(err)
    })
  })
})
