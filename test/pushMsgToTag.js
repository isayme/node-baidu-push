var should = require('should')
var config = require('./config')
var Client = require('../lib/client')

var client = new Client(config.apiKey, config.secretKey)

describe('BaiduPushClient tag create/delete/query', function () {
  before(function (done) {
    client.createTag('tagName', function (err, data) {
      should.equal(data.tag, 'tagName')
      done(err)
    })
  })

  var msg = {
    title: 'test title',
    description: 'test description'
  }
  var options = {msg_type: 1}

  it('should ok when push to exist tagname', function (done) {
    client.pushMsgToTag('tagName', msg, options, function (err, data) {
      should.equal(err, null)
      done()
    })
  })

  it('should fail when push to no-exist tagname', function (done) {
    client.pushMsgToTag('tagxName', msg, options, function (err, data) {
      should.exist(err)
      done()
    })
  })

  after(function (done) {
    client.deleteTag('tagName', function (err, data) {
      should.equal(data.tag, 'tagName')
      done(err)
    })
  })
})
