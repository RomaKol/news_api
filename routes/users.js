var express = require('express');
var router = express.Router();
const constroller = require('../controllers/users');

/* GET users listing. */
router.get('/users', constroller.getUsers);

/* GET user. */
router.get('/users/:id', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST user create. */
router.post('/users', constroller.createUser);

/* PATCH user. */
router.patch('/users/:id', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
