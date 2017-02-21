var _ = require('lodash')

var constant = require('./constant')

var request = require('./request')
var PushKeyPair = require('./pushkeypair')

var validHosts = [
  'api.push.baidu.com',
  'api.tuisong.baidu.com',
  'channel.api.duapp.com'
]

var BaiduPushClient = function (apiKey, secretKey, host) {
  if (apiKey instanceof PushKeyPair) {
    this.pair = apiKey
    this.apiKey = this.pair.apiKey
    this.secretKey = this.pair.secretKey
    this.host = secretKey
  } else {
    this.apiKey = apiKey
    this.secretKey = secretKey
    this.pair = new PushKeyPair(apiKey, secretKey)
    this.host = host
  }

  this.host = this.host || validHosts[0]

  if (!_.contains(validHosts, this.host)) {
    throw new Error('host should in: ' + validHosts)
  }

  this.protocol = 'http://'

  if (typeof this.apiKey !== 'string' || this.apiKey.length <= 0) {
    throw new Error('apiKey must be a string with length > 0')
  }

  if (typeof this.secretKey !== 'string' || this.secretKey.length <= 0) {
    throw new Error('secretKey must be a string with length > 0')
  }

  return this
}

var prototype = BaiduPushClient.prototype

prototype.request = request

// eslint-disable-next-line camelcase
prototype.pushMsgToSingleDevice = function (channel_id, msg, options, callback) {
  if (_.isFunction(options)) {
    callback = options
    options = {}
  }

  var data = {
    channel_id: channel_id,
    msg: JSON.stringify(msg)
  }
  _.extend(data, options)

  this.request(constant.pushMsgToSingleDevice, data, callback)
}

prototype.pushMsgToAll = function (msg, options, callback) {
  if (_.isFunction(options)) {
    callback = options
    options = {}
  }

  var data = {
    msg: JSON.stringify(msg)
  }
  _.extend(data, options)

  this.request(constant.pushMsgToAll, data, callback)
}

prototype.pushMsgToTag = function (tagName, msg, options, callback) {
  if (_.isFunction(options)) {
    callback = options
    options = {}
  }

  var data = {
    type: 1, // 目前此值固定
    tag: tagName,
    msg: JSON.stringify(msg)
  }
  _.extend(data, options)

  this.request(constant.pushMsgToTag, data, callback)
}

// eslint-disable-next-line camelcase
prototype.pushBatchUniMsg = function (channel_ids, msg, options, callback) {
  if (_.isFunction(options)) {
    callback = options
    options = {}
  }

  var data = {
    channel_ids: channel_ids,
    msg: JSON.stringify(msg)
  }
  _.extend(data, options)

  this.request(constant.pushBatchUniMsg, data, callback)
}

// eslint-disable-next-line camelcase
prototype.queryMsgStatus = function (msg_id, callback) {
  this.request(constant.queryMsgStatus, {msg_id: msg_id}, callback)
}

// eslint-disable-next-line camelcase
prototype.queryTimerRecords = function (timer_id, options, callback) {
  if (_.isFunction(options)) {
    callback = options
    options = {}
  }

  var data = {
    timer_id: timer_id
  }
  _.extend(data, options)

  this.request(constant.queryTimerRecords, data, callback)
}

// eslint-disable-next-line camelcase
prototype.queryTopicRecords = function (topic_id, options, callback) {
  if (_.isFunction(options)) {
    callback = options
    options = {}
  }

  var data = {
    topic_id: topic_id
  }
  _.extend(data, options)

  this.request(constant.queryTopicRecords, data, callback)
}

prototype.queryTimerList = function (options, callback) {
  if (_.isFunction(options)) {
    callback = options
    options = {}
  }

  this.request(constant.queryTimerList, options, callback)
}

prototype.queryTopicList = function (options, callback) {
  if (_.isFunction(options)) {
    callback = options
    options = {}
  }

  this.request(constant.queryTopicList, options, callback)
}

prototype.queryTags = function (options, callback) {
  if (_.isFunction(options)) {
    callback = options
    options = {}
  }

  var data = {}
  _.extend(data, options)

  this.request(constant.queryTags, data, callback)
}

prototype.createTag = function (tag, callback) {
  this.request(constant.createTag, {tag: tag}, callback)
}

prototype.deleteTag = function (tag, callback) {
  this.request(constant.deleteTag, {tag: tag}, callback)
}

// eslint-disable-next-line camelcase
prototype.addDevicesToTag = function (tag, channel_ids, callback) {
  var data = {
    tag: tag,
    channel_ids: channel_ids
  }

  this.request(constant.addDevicesToTag, data, callback)
}

// eslint-disable-next-line camelcase
prototype.deleteDevicesFromTag = function (tag, channel_ids, callback) {
  var data = {
    tag: tag,
    channel_ids: channel_ids
  }

  this.request(constant.deleteDevicesFromTag, data, callback)
}

prototype.queryDeviceNumInTag = function (tag, callback) {
  this.request(constant.queryDeviceNumInTag, {tag: tag}, callback)
}

// eslint-disable-next-line camelcase
prototype.queryStatisticTopic = function (topic_id, callback) {
  this.request(constant.queryStatisticTopic, {topic_id: topic_id}, callback)
}

prototype.queryStatisticDevice = function (callback) {
  this.request(constant.queryStatisticDevice, {}, callback)
}

module.exports = BaiduPushClient
