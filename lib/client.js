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
    this.host = secretKey;
  } else {
    this.pair = new PushKeyPair(apiKey, secretKey);
    this.host = host;
  }

  this.host = this.host || validHosts[0];

  if (!_.contains(validHosts, this.host)) {
    throw new Error('host should in: ' + validHosts);
  }

  this.host = 'http://' + this.host;

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
