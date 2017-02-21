var BaiduPushError = function (msg) {
  Error.call(this)
  this.stack = new Error().stack
  this.message = msg
  this.name = 'BaiduPushError'

  return this
}

BaiduPushError.prototype = Object.create(Error.prototype)
BaiduPushError.prototype.constructor = Error

BaiduPushError.prototype.getErrorMsg = function () {
  return this.message
}

BaiduPushError.prototype.getErrorCode = function () {
  return this.code
}

BaiduPushError.prototype.getRequestId = function () {
  return this.requestId
}

module.exports = BaiduPushError
