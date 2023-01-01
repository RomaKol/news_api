var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET user. */
router.get('/users/:id', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST user create. */
router.post('/users', function(req, res, next) {
  res.send('respond with a resource');
});

/* PATCH user. */
router.patch('/users/:id', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
