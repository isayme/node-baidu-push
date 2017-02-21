var should = require('should')
var PushKeyPair = require('../lib/pushkeypair')
var config = require('./config')

describe('PushKeyPair::constructor', function () {
  it('should ok with nice apiKey & secretKey', function () {
    var pair = new PushKeyPair(config.apiKey, config.secretKey)

    should.equal(pair.apiKey, config.apiKey)
    should.equal(pair.secretKey, config.secretKey)
  })

  it('should throw if apiKey invalid', function () {
    should.throws(function () {
      new PushKeyPair(undefined, config.secretKey)
    })

    should.throws(function () {
      new PushKeyPair(0, config.secretKey)
    })

    should.throws(function () {
      new PushKeyPair('', config.secretKey)
    })

    should.throws(function () {
      new PushKeyPair({}, config.secretKey)
    })
  })

  it('should throw if secretKey invalid', function () {
    should.throws(function () {
      new PushKeyPair(config.apiKey, undefined)
    })

    should.throws(function () {
      new PushKeyPair(config.apiKey, 0)
    })

    should.throws(function () {
      new PushKeyPair(config.apiKey, '')
    })

    should.throws(function () {
      new PushKeyPair(config.apiKey, {})
    })
  })
})
