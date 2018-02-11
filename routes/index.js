var express = require('express');
const ipbl = require('./ipbl');

ipbl.setkey('xxxxxxxx');


var router = express.Router();

ipbl.ipreputation('185.174.137.249').then( (res) => {
console.log(res);
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { name: 'Soteria' });
});

module.exports = router;
