var _ = require('lodash');

var constant = require('./constant');

var request = require('./request');
var PushKeyPair = require('./pushkeypair');

var validHosts = [
  'api.push.baidu.com',
  'api.tuisong.baidu.com',
  'channel.api.duapp.com'
];

var BaiduPushClient = function(apiKey, secretKey, host) {
  if (apiKey instanceof PushKeyPair) {
    this.pair = apiKey;
    this.apiKey = this.pair.apiKey;
    this.secretKey = this.pair.secretKey;
    this.host = secretKey;
  } else {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.pair = new PushKeyPair(apiKey, secretKey);
    this.host = host;
  }

  this.host = this.host || validHosts[0];

  if (!_.contains(validHosts, this.host)) {
    throw new Error('host should in: ' + validHosts);
  }

  this.protocol = 'http://';

  if (!this.apiKey || typeof this.apiKey !== 'string' || this.apiKey.length <= 0) {
    throw new Error('apiKey must be a string with length > 0');
  }

  if (!this.secretKey || typeof this.secretKey !== 'string' || this.secretKey.length <= 0) {
    throw new Error('secretKey must be a string with length > 0');
  }

  return this;
};

var prototype = BaiduPushClient.prototype;

prototype.request = request;

prototype.pushMsgToSingleDevice = function(channel_id, msg, options, callback) {
  if (_.isFunction(options)) {
    callback = options;
    options = {};
  }

  var data = {
    channel_id: channel_id,
    msg: JSON.stringify(msg)
  };
  _.extend(data, options);

  this.request(constant.pushMsgToSingleDevice, data, callback);
};

prototype.pushMsgToAll = function(msg, options, callback) {
  if (_.isFunction(options)) {
    callback = options;
    options = {};
  }

  var data = {
    msg: JSON.stringify(msg)
  };
  _.extend(data, options);

  this.request(constant.pushMsgToAll, data, callback);
};

module.exports = BaiduPushClient;
