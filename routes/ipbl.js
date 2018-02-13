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

function ipdata(ans) {
  var data = {};

  if (ans[0] != "127") {
    data.err = "result data format mismatch."
  } else {
    data.day = ans[1];
    data.score = ans[2];

    //more fast by using switch case
    switch (ans[3]) {
      case "0":
        data.type = [
          "Search Engine"
        ];
        break;

      case "1":
        data.type = [
          "Suspicious"
        ];
        break;

      case "2":
        data.type = [
          "Harvester"
        ];
        break;

      case "3":
        data.type = [
          "Suspicious",
          "Harvester"
        ];
        break;

      case "4":
        data.type = [
          "Comment Spammer"
        ];
        break;

      case "5":
        data.type = [
          "Suspicious",
          "Comment Spammer"
        ];
        break;

      case "6":
        data.type = [
          "Harvester",
          "Comment Spammer"
        ];
        break;

      case "7":
        data.type = [
          "Suspicious",
          "Harvester",
          "Comment Spammer"
        ];
        break;

      case "255":
        data.type = [
        ];
        break;

      default:
        data.type = [
          "Unknown"
        ];
        break;
    }
  }

  return data;
}

function ipreputation(ip) {
  var ipb = ip.split(".").reverse().join(".");

  var fqdn = accesskey + "." + ipb + ".dnsbl.httpbl.org";  //console.log(fqdn);
  console.log(fqdn);

  return new Promise(function (fulfill, reject) {
    lookup(fqdn).then((res) => {
      ans = res.answer[0].address.split(".");
      fulfill(ipdata(ans));
    }).catch((err) => {
      ans = ['127', '0', '0', '255'];
      fulfill(ipdata(ans));
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

function fqdnipreputation(fqdn) {
  return new Promise(function (fulfill, reject) {
    lookup(fqdn).then((res) => {
      ipreputation(res.answer[0].address).then((res) => {
        fulfill(res);
      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
      reject(err);
    });
  });
}

exports.lookup = lookup;
exports.ipreputation = ipreputation;
exports.fqdnipreputation = fqdnipreputation;
