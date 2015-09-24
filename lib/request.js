var child_process = require('child_process');

var _ = require('lodash');
var request = require('request');

var signKey = require('./sign');

// default UA
var UA = 'BCCS_SDK/3.0 (Drain) node/' + process.version + ' (Baidu Push Server SDK V3.0.0)';
if (child_process.execSync) {
  UA = child_process.execSync('uname -a', {encoding: 'utf8'});
  UA = 'BCCS_SDK/3.0 (' + UA + ') node/' + process.version + ' (Baidu Push Server SDK V3.0.0)';
} else {
  child_process.exec('uname -a', {encoding: 'utf8'}, function(err, stdout) {
    if (err) throw err;
    UA = 'BCCS_SDK/3.0 (' + stdout + ') node/' + process.version + ' (Baidu Push Server SDK V3.0.0)';
  });
}

module.exports = function(url, data, callback) {
  var options = {
    headers: {
      'User-Agent': UA,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  };

  options.method = 'POST';
  options.url = this.protocol + this.host + url;
  options.gzip = true;
  options.json = true;

  for (var key in data) {
    if (_.isArray(data[key])) {
      data[key] = JSON.stringify(data[key]);
    }
  }

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
      callback(err);
    } else {
      callback(null, data.response_params);
    }
  });
};
