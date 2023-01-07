const express = require('express');
const router = express.Router();
const constroller = require('../controllers/users');
const encrypt = require('../utils/encrypt');

/* GET users listing. */
router.get('/users', async (req, res, next) => {
  const users = await constroller.getUsers();

  res.json(users);
});

/* GET user. */
router.get('/users/:id', async (req, res, next) => {
  const id = req.params.id;
  const user = await constroller.getUserById(id);

  res.json(user);
});

/* POST user create. */
router.post('/users', async (req, res, next) => {
  const { name, email, password } = req.body;
  const encryptedPassword = await encrypt.cryptPassword(password);
  const createdUsers = await constroller.createUser({ name, email, password: encryptedPassword });

  res.json(createdUsers);
});

/* PATCH user. */
router.patch('/users/:id', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
