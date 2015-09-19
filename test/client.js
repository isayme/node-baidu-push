var should = require('should');
var PushKeyPair = require('../lib/pushkeypair');
var BaiduPushClient = require('../lib/client');
var config = require('./config');

var defaulthost = 'api.push.baidu.com';

describe('BaiduPushClient::constructor', function() {
  it('should ok when constructor with apikey & secretKey', function() {
    var client = new BaiduPushClient(config.apiKey, config.secretKey);

    should.equal(client.apiKey, config.apiKey);
    should.equal(client.secretKey, config.secretKey);
    should.equal(client.host, defaulthost);
  });

  it('should ok when constructor with apikey & secretKey & host', function() {
    var host = 'api.tuisong.baidu.com';
    var client = new BaiduPushClient(config.apiKey, config.secretKey, host);

    should.equal(client.apiKey, config.apiKey);
    should.equal(client.secretKey, config.secretKey);
    should.equal(client.host, host);
  });

  it('should ok when constructor with pair', function() {
    var pair = new PushKeyPair(config.apiKey, config.secretKey);
    var client = new BaiduPushClient(pair);

    should.equal(client.apiKey, config.apiKey);
    should.equal(client.secretKey, config.secretKey);
    should.equal(client.host, defaulthost);
  });

  it('should ok when constructor with pair & host', function() {
    var host = 'api.tuisong.baidu.com';
    var pair = new PushKeyPair(config.apiKey, config.secretKey);
    var client = new BaiduPushClient(pair, host);

    should.equal(client.apiKey, config.apiKey);
    should.equal(client.secretKey, config.secretKey);
    should.equal(client.host, host);
  });

  it('should throw if apikey is invalid', function() {
    should.throws(function() {
      new BaiduPushClient(undefined, config.secretKey);
    });

    should.throws(function() {
      new BaiduPushClient(0, config.secretKey);
    });

    should.throws(function() {
      new BaiduPushClient('', config.secretKey);
    });

    should.throws(function() {
      new BaiduPushClient({}, config.secretKey);
    });

    should.throws(function() {
      new BaiduPushClient({}, config.secretKey);
    });
  });

  it('should throw if secretKey invalid', function() {
    should.throws(function() {
      new BaiduPushClient(config.apiKey, undefined);
    });

    should.throws(function() {
      new BaiduPushClient(config.apiKey, 0);
    });

    should.throws(function() {
      new BaiduPushClient(config.apiKey, '');
    });

    should.throws(function() {
      new BaiduPushClient(config.apiKey, {});
    });
  });

  it('should throw if host invalid', function() {
    should.throws(function() {
      var host = 'isayme.org';
      new BaiduPushClient(config.apiKey, config.secretKey, host);
    });
  });

});
