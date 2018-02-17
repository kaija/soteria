var express = require('express');
const ipbl = require('./ipbl');
const whois = require('./whois');
const httpcert = require('./httpcert');
const async = require('async');
const URL = require('url');

ipbl.setkey('xxxxxxxxxx');
whois.setkey('xxxxxxxxxx');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { name: 'Soteria' });
});

router.post("/reputation", function (req, res, next) {
  if(req.body.url) {
    hostname = URL.parse(req.body.url).hostname;
    async.parallel({
      whois: function(callback){
        whois.lookup(req.body.url).then((data)=>{
          callback(null, data);
        }).catch((err)=>{
          callback(err, null);
        });
      },
      ipbl: function(callback){
        ipbl.fqdnipreputation(hostname).then((data)=>{
          callback(null, data);
        }).catch((err)=>{
          callback(err, null);
        });
      },
      cert: function(callback){
        httpcert.get(hostname).then((data)=>{
          callback(null, data);
        }).catch((err)=>{
          callback(err, null);
        });
      }
    }, function(err, result){
      console.log(result);
      res.send(result);
    });
  }else{
    res.status(400).send({error: "missing url parameter"});
  }
});

module.exports = router;
