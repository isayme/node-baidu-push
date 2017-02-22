module.exports = function (apiKey, secretKey) {
  this.apiKey = apiKey
  this.secretKey = secretKey

  if (typeof apiKey !== 'string' || apiKey.length <= 0) {
    throw new Error('apiKey must be a string with length > 0')
  }

  if (typeof secretKey !== 'string' || secretKey.length <= 0) {
    throw new Error('secretKey must be a string with length > 0')
  }

  return this
}
