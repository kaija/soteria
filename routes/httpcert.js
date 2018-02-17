var sslcert = require('./get-ssl-cert');

function get(fqdn) {
  return new Promise(function (fulfill, reject) {
    sslcert.get(fqdn, {rejectUnauthorized: true}).then((res)=>{
      var score = {};
      //check self signed certficate
      if (res.subject.hasOwnProperty('businessCategory')) {
        score.cert_level = 'EV';
      } else if (res.subject.hasOwnProperty('O')) {
        score.cert_level = 'OV';
      } else {
        score.cert_level = 'DV';
      }
      fulfill(score);
    }).catch((err)=>{
      var score = {cert_level: 'SS'};
      fulfill(score);
    });
  });
}

exports.get = get;
