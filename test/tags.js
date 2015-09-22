var should = require('should');
var config = require('./config');
var Client = require('../lib/client');

client = new Client(config.apiKey, config.secretKey);

describe('BaiduPushClient::createTag', function() {
  it('should has 1 tag by defaults', function(done) {
    client.queryTags(function(err, data) {
      should.equal(data.total_num, 1);
      done();
    });
  });

  it('should sucess create tag', function(done) {
    client.createTag('tagName', function(err, data) {
      should.equal(data.tag, 'tagName');
      done();
    });
  });

  it('should has 2 tags now', function(done) {
    client.queryTags(function(err, data) {
      should.equal(data.total_num, 2);
      data.result.should.have.length(2);
      done();
    });
  });

  it('should has 1 tags when start 1', function(done) {
    client.queryTags({start: 1}, function(err, data) {
      should.equal(data.total_num, 2);
      data.result.should.have.length(1);
      done();
    });
  });

  it('should has 1 tags now when limit 1', function(done) {
    client.queryTags({limit: 1}, function(err, data) {
      should.equal(data.total_num, 2);
      data.result.should.have.length(1);
      done();
    });
  });

  it('should find tag with name', function(done) {
    client.queryTags({tag: 'tagName'}, function(err, data) {
      should.equal(data.total_num, 1);
      data.result.should.have.length(1);
      done();
    });
  });

  it('should sucess delete tag', function(done) {
    client.deleteTag('tagName', function(err, data) {
      should.equal(data.tag, 'tagName');
      done();
    });
  });

  it('should has 1 tags now', function(done) {
    client.queryTags(function(err, data) {
      should.equal(data.total_num, 1);
      done();
    });
  });

  it('should fail delete default tag', function(done) {
    client.deleteTag('default', function(err, data) {
      should.exist(err);
      done();
    });
  });

  it('should fail create default tag', function(done) {
    client.createTag('default', function(err, data) {
      should.exist(err);
      done();
    });
  });
});
