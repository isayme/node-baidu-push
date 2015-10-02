var should = require('should');
var config = require('./config');
var Client = require('../lib/client');

client = new Client(config.apiKey, config.secretKey);

describe('BaiduPushClient tag create/delete/query', function() {
  before(function(done) {
    client.createTag('tagName', function(err, data) {
      should.equal(data.tag, 'tagName');
      done();
    });
  });

  var msg = {
    title: 'test title',
    description: 'test description'
  };
  var options = {msg_type: 1};

  it('shuold ok when push to exist tagname', function(done) {
    client.pushMsgToTag('tagName', msg, options, function(err, data) {
      should.equal(err, null);
      done();
    });
  });

  it('shuold fail when push to no-exist tagname', function(done) {
    client.pushMsgToTag('tagxName', msg, options, function(err, data) {
      should.exist(err);
      done();
    });
  });

  after(function(done) {
    client.deleteTag('tagName', function(err, data) {
      should.equal(data.tag, 'tagName');
      done();
    });
  });
});
