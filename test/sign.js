var should = require('should')
var signKey = require('../lib/sign')

describe('signKey', function () {
  var result = '7d14113142e2a1583b4e9dad3fba73d0'

  it('should sign ok', function () {
    var url = 'http://api.tuisong.baidu.com/rest/3.0/test/echo'
    var secretKey = '87772555E1C16715EBA5C85341684C58'
    var param = {
      apikey: 'Ljc710pzAa99GULCo8y48NvB',
      expires: 1313293565,
      timestamp: 1427180905
    }

    var sign = signKey(url, param, secretKey)
    should.equal(sign, result)
  })

  it('should sign ok even change param sort', function () {
    var url = 'http://api.tuisong.baidu.com/rest/3.0/test/echo'
    var secretKey = '87772555E1C16715EBA5C85341684C58'
    var param = {
      expires: 1313293565,
      timestamp: 1427180905,
      apikey: 'Ljc710pzAa99GULCo8y48NvB'
    }

    var sign = signKey(url, param, secretKey)
    should.equal(sign, result)
  })
})
