const URL = require('url');
const request = require('request');
const util = require('util');

var apikey = '';

exports.setkey = function(key) {
  apikey = key;
};

function parseurl(url) {
  var hostname = URL.parse(url);
  return hostname;
}

function parsedomain(url) {
  hostname = parseurl(url).hostname;
  var domain = null;
  if (hostname ) {
    token = hostname.split('.');
    domain = token[token.length - 2] + '.' + token[token.length - 1];
  }
  return domain;
}

/*
function jwawhois(domain) {
  url = "https://jsonwhoisapi.com/api/v1/whois?identifier='" + domain + "'";

  request.get(url, {
    auth: {
      user: '',
      pass: ''
    },
    json: true
  }, function(err, res, body) {
    console.log(err);
    console.log(res);
    console.log(body);
  });
}
*/

function whoisxmlscore(data) {
  var score = {};
  return score;
}

function whoisxml(domain, callback) {
  var url = util.format('https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=%s&outputFormat=JSON&ip=1&domainName=%s', apikey, domain);
  var options = {
    url: url
  };
  request(options, function(err, resp, body) {
    if (body) {
      //console.log(body);
      callback(null, body);
    }else{
      callback(err, null);
    }
  });
}



function lookup(url) {
  domain = parsedomain(url);
  console.log(domain);
  whoisxml(domain, function(err, data) {
    console.log(data);
  });
}

//lookup('http://www.google.com/');

exports.lookup = lookup;
