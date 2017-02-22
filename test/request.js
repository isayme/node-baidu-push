var should = require('should')
var nock = require('nock')
var config = require('./config')
var Client = require('../lib/client')

var client = new Client(config.apiKey, config.secretKey)

describe('request', function () {
  it('should return response', function (done) {
    nock('http://api.push.baidu.com')
      .post('/post')
      .reply(200, {
        ok: true
      })

    client.request('/post', {}, function (err, data) {
      should.equal(data.ok, true)
      done(err)
    })
  })

  it('should return err', function (done) {
    nock('http://api.push.baidu.com')
      .post('/post')
      .reply(200, {
        error_code: 1,
        error_msg: 'err message'
      })

    client.request('/post', {}, function (err, data) {
      should.equal(err.code, 1)
      should.equal(err.message, 'err message')
      done()
    })
  })
})
