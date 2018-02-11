const Promise = require("bluebird");
const cares = require("cares");
resolv = new cares.Resolver({
  servers: [
    "8.8.8.8"
  ]
});

resolv_opt = {
  type: cares.NS_T_A,
  class: cares.NS_C_IN,
};

// IPBL access key
var accesskey = "";

exports.setkey = function (key) {
  accesskey = key;
};

function ipreputation(ip) {
  var ipb = ip.split(".").reverse().join(".");
  var fqdn = accesskey + "." + ipb + ".dnsbl.httpbl.org";  //console.log(fqdn);
  return new Promise(function (fulfill, reject) {
    lookup(fqdn).then((res) => {
      fulfill(res);
    }).catch((err) => {
      reject(err);
    });
  });
}

function lookup(fqdn) {
  return new Promise(function (fulfill, reject) {
    resolv.query(fqdn, resolv_opt).then((res) => {
      fulfill(res);
    }).catch((err) => {
      reject(err);
    });
  });
}

exports.lookup = lookup;
exports.ipreputation = ipreputation;
