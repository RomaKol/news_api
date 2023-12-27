const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const tokensController = require('../controllers/tokens');
const encrypt = require('../utils/encrypt');

/* POST sign-up */
router.post('/auth/sign-up', async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(500).json({
      message: 'name, email, password are required!'
    });
  }
  const encryptedPassword = await encrypt.cryptPassword(password);
  const createdUsers = await usersController.createUser({ name, email, password: encryptedPassword });
  const token = await tokensController.createToken({ userId: createdUsers.id });

  res
    .status(201)
    .json({
      message: 'User registered successfully',
      user: {
        name: createdUsers.name,
        email: createdUsers.email,
        id: createdUsers.id,
      },
      token,
    });
});

/* POST sign-up */
router.post('/auth/sign-in', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(500).json({
      message: 'email, password are required!'
    });
  }
  const encryptedPassword = await encrypt.cryptPassword(password);
  const createdUsers = await usersController.createUser({ name, email, password: encryptedPassword });
  const token = await tokensController.createToken({ userId: createdUsers.id });

  res
    .status(201)
    .json({
      message: 'User registered successfully',
      user: {
        name: createdUsers.name,
        email: createdUsers.email,
        id: createdUsers.id,
      },
      token,
    });
});

/* POST sign-out */
router.get('/auth/sign-out', async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  const result = await tokensController.deleteToken({ token });
  if (result.rowCount > 0) {
    res
      .status(201)
      .json({
        message: 'User logged out successfully',
      });
  } else {
    res.send('There is no user with this id!');
  }
});

module.exports = router;
