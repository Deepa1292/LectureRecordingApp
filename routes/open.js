var express = require('express');
var router = express.Router();

// /open/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// /open/test
router.get('/test', function(req, res, next) {
  res.send('respond with a TEST resource');
});

// /open/test/123
router.get('/test/:id', function(req, res, next) {
  var id = req.params.id;
  res.send('respond with a resource ' +id);
});

module.exports = router;
