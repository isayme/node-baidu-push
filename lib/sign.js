/*
 * 算法为百度官方提供: http://push.baidu.com/doc/restapi/sdk_developer
 */
var crypto = require('crypto');

function fullEncodeURIComponent(str) {
  var rv = encodeURIComponent(str).replace(/[!'()*~]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
  return rv.replace(/\%20/g,'+');
}

var singKey = function(url, param, secretKey) {
  var basekey = '';
  var paramStr = '';

  var key;

  var keys = Object.keys(param).sort();

  keys.forEach(function (key) {
    paramStr += key + "=" + param[key];
  });

  basekey = 'POST' + url + paramStr + secretKey;

  var md5 = crypto.createHash('md5');

  basekey = fullEncodeURIComponent(basekey);

  md5.update(basekey);

  return md5.digest('hex');
};

module.exports = singKey;
