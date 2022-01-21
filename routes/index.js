var express = require('express');

/* GET home page. */
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
