var express = require('express');
const ipbl = require('./ipbl');
const whois = require('./whois');
ipbl.setkey('xxxxxxxxxx');
whois.setkey('xxxxxxxxxx');

var router = express.Router();
/*
ipbl.ipreputation('185.174.137.249').then( (res) => {
console.log(res);
});

ipbl.lookup('www.google.com').then( (res) => {
console.log(res);
});

ipbl.fqdnipreputation('www.google.com').then( (res) => {
console.log(res);
}).catch((err)=>{
console.log(err);
});

*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { name: 'Soteria' });
});

module.exports = router;
