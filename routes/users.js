const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const encrypt = require('../utils/encrypt');

/* GET users listing. */
router.get('/users', async (req, res, next) => {
  const users = await controller.getUsers();

  res.json(users);
});

/* GET user. */
router.get('/users/:id', async (req, res, next) => {
  const id = req.params.id;
  const user = await controller.getUserById(id);

  res.json(user);
});

/* POST user create. */
router.post('/users', async (req, res, next) => {
  const { name, email, password } = req.body;
  const encryptedPassword = await encrypt.cryptPassword(password);
  const createdUsers = await controller.createUser({ name, email, password: encryptedPassword });

  res.json(createdUsers);
});

/* PATCH user. */
router.put('/users', async (req, res, next) => {
  const { name, email, id } = req.body;
  const updatedUser = await controller.updateUser({ name, email, id });

  res.json(updatedUser);
});

// TODO: add patch for user,
// TODO: change (patching) password
/* PATCH user. */
router.patch('/users/:id', function(req, res, next) {
  res.send('respond with a resource');
});

/* DELETE user. */
router.delete('/users/:id', async (req, res, next) => {
  const id = req.params.id;
  const result = await controller.deleteUser(id);

  if (result.rowCount > 0) {
    res.send('User successfully deleted!');
  } else {
    res.send('There is no user with this id!');
  }
});
// TODO: add error for bad request
// TODO: auth (login, logout, signup) for users
// TODO: jwt token logic for auth

module.exports = router;
