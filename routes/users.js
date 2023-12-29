const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const authenticateToken = require('../middlewares/authenticateToken');
const encrypt = require('../utils/encrypt');

/* GET users listing. */
router.get('/users', authenticateToken, async (req, res, next) => {
  const users = await controller.getUsers();

  res.status(201).json(users);
});

/* GET user. */
router.get('/users/:id', authenticateToken, async (req, res, next) => {
  const id = req.params.id;
  const user = await controller.getUserById(id);

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(404).send('User not found!');
  }
});

/* PUT user. */
router.put('/users/:id', authenticateToken, async (req, res, next) => {
  const { name, email } = req.body;
  const id = parseInt(req.params.id);

  if (req.userId === id) {
    const numberUpdatedUsers = await controller.updateUser({ name, email, id });

    if (numberUpdatedUsers > 0) {
      const user = await controller.getUserById(id);
      res.status(201).json(user);
    } else {
      res.status(500).send('Internal server error');
    }
    
  } else {
    res.status(500).send('You don\'t have permissions to change this user!');
  }
});

/* PATCH user. */
router.patch('/users/:id', authenticateToken, async (req, res, next) => {
  const { name, email, password } = req.body;
  const id = parseInt(req.params.id);
  const changedParams = { id, name, email };

  if (password) {
    const encryptedPassword = await encrypt.cryptPassword(password);
    changedParams.password = encryptedPassword;
  };

  if (req.userId === id) {
    const updatedUser = await controller.updateUser2(changedParams);

    if (updatedUser) {
      const { password, ...user } = updatedUser;
      res.status(201).json(user);
    } else {
      res.status(500).send('Internal server error');
    }
    
  } else {
    res.status(500).send('You don\'t have permissions to change this user!');
  }
});

/* DELETE user. */
router.delete('/users/:id', authenticateToken, async (req, res, next) => {
  const id = parseInt(req.params.id);
  if (req.userId === id) {
    const result = await controller.deleteUser(id);

    if (result.rowCount > 0) {
      res.status(201).send('User successfully deleted!');
    } else {
      res.status(500).send('Something went wrong!');
    }
  
  } else {
    res.status(500).send('You don\'t have permissions to delete this user!');
  }
  
});

module.exports = router;
