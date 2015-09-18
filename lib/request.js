var child_process = require('child_process');

var _ = require('lodash');
var request = require('request');

var signKey = require('./sign');

var UA = child_process.execSync('uname -a', {encoding: 'utf8'});
UA = 'BCCS_SDK/3.0 (' + UA + ') node/' + process.version + ' (Baidu Push Server SDK V3.0.0)';

module.exports = function(url, data, callback) {
  var options = {
    headers: {
      'User-Agent': UA,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  };

  options.method = 'POST';
  options.url = this.host + url;
  options.gzip = true;
  options.json = true;

  options.form = data;
  _.extend(options.form, {
    apikey: this.pair.apiKey,
    timestamp: Math.floor(Date.now() / 1000)
  });

  options.form.sign = signKey(options.url, data, this.pair.secretKey);

  request(options, function(err, res, data) {
    if (!err && data.error_code) {
      err = new Error(data.error_msg);
      err.code = data.error_code;
    }
    if (err) {
      return callback(err);
    } else {
      callback(null, data);
    }
  });
};
