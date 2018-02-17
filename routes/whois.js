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

function whoisxmlgetcountry(data) {
  raw = data.split('\n');
  for (i in raw){
    token = raw[i];
    if (token.startsWith('Registrant Country')) {
      return token.split(' ').pop();
    }
  }
  return 'Unknown';
}

function whoisxmlscore(data) {
  var score = {};
  now = Date.now();
  reg = Date.parse(data.WhoisRecord.createdDate);
  daydiff = Math.floor( (now - reg)/86400000 );
  score.days = daydiff;

  score.country = whoisxmlgetcountry(data.WhoisRecord.registrant.rawText)
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


/*
function lookup(url, callback) {
  domain = parsedomain(url);
  whoisxml(domain, function(err, data) {
    score = whoisxmlscore(JSON.parse(data));
    callback(null, score);
  });
}
*/
function lookup(url) {
  domain = parsedomain(url);
  return new Promise(function (fulfill, reject) {
    whoisxml(domain, function(err, data) {
      if(err) {
        reject(err);
      } else {
        score = whoisxmlscore(JSON.parse(data));
        fulfill(score);
      }
    });
  });
}

//lookup('http://www.google.com/');

exports.lookup = lookup;
