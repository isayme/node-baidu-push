var should = require('should')
var config = require('./config')
var Client = require('../lib/client')

var client = new Client(config.apiKey, config.secretKey)

describe('BaiduPushClient tag create/delete/query', function () {
  before(function (done) {
    client.deleteTag('tagName', function (err, data) {
      done(err)
    })
  })

  it('should has 1 tag by defaults', function (done) {
    client.queryTags(function (err, data) {
      should.equal(data.total_num, 1)
      done(err)
    })
  })

  it('should sucess create tag', function (done) {
    client.createTag('tagName', function (err, data) {
      should.equal(data.tag, 'tagName')
      done(err)
    })
  })

  it('should has 2 tags now', function (done) {
    client.queryTags(function (err, data) {
      should.equal(data.total_num, 2)
      data.result.should.have.length(2)
      done(err)
    })
  })

  it('should has 1 tags when start 1', function (done) {
    client.queryTags({start: 1}, function (err, data) {
      should.equal(data.total_num, 2)
      data.result.should.have.length(1)
      done(err)
    })
  })

  it('should has 1 tags now when limit 1', function (done) {
    client.queryTags({limit: 1}, function (err, data) {
      should.equal(data.total_num, 2)
      data.result.should.have.length(1)
      done(err)
    })
  })

  it('should find tag with name', function (done) {
    client.queryTags({tag: 'tagName'}, function (err, data) {
      should.equal(data.total_num, 1)
      data.result.should.have.length(1)
      done(err)
    })
  })

  it('should sucess delete tag', function (done) {
    client.deleteTag('tagName', function (err, data) {
      should.equal(data.tag, 'tagName')
      done(err)
    })
  })

  it('should has 1 tags now', function (done) {
    client.queryTags(function (err, data) {
      should.equal(data.total_num, 1)
      done(err)
    })
  })

  it('should fail delete default tag', function (done) {
    client.deleteTag('default', function (err, data) {
      should.exist(err)
      done(err)
    })
  })

  it('should fail create default tag', function (done) {
    client.createTag('default', function (err, data) {
      should.exist(err)
      done(err)
    })
  })
})

describe('BaiduPushClient add/delete device to tag', function () {
  before(function (done) {
    client.createTag('tagName', function (err, data) {
      should.equal(data.tag, 'tagName')
      done(err)
    })
  })

  it('should return 0/-1 device of tag', function (done) {
    client.queryDeviceNumInTag('tagName', function (err, data) {
      should.equal(err, null)
      should.equal(data.device_num, -1)
      done(err)
    })
  })

  it('should ok when add device to tag', function (done) {
    client.addDevicesToTag('tagName', config.channel_ids, function (err, data) {
      should.equal(err, null)
      done(err)
    })
  })

  it('should return 2 device of tag', function (done) {
    client.queryDeviceNumInTag('tagName', function (err, data) {
      should.equal(err, null)
      // should.equal(data.device_num, 2);
      done(err)
    })
  })

  it('should ok when delete device to tag', function (done) {
    client.deleteDevicesFromTag('tagName', config.channel_ids, function (err, data) {
      should.equal(err, null)
      done(err)
    })
  })

  it('should return 0/-1 device of tag', function (done) {
    client.queryDeviceNumInTag('tagName', function (err, data) {
      should.equal(err, null)
      done(err)
    })
  })

  after(function (done) {
    client.deleteTag('tagName', function (err, data) {
      should.equal(data.tag, 'tagName')
      done(err)
    })
  })
})
