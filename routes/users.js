const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const authenticateToken = require('../middlewares/authenticateToken');

/* GET users listing. */
router.get('/users', async (req, res, next) => {
  const users = await controller.getUsers();

  res.status(201).json(users);
});

/* GET user. */
router.get('/users/:id', async (req, res, next) => {
  const id = req.params.id;
  const user = await controller.getUserById(id);

  res.status(201).json(user);
});

/* POST user create. */
// Remove after auth will be finished
// router.post('/users', async (req, res, next) => {
//   const { name, email, password } = req.body;
//   const encryptedPassword = await encrypt.cryptPassword(password);
//   const createdUsers = await controller.createUser({ name, email, password: encryptedPassword });

//   res.json(createdUsers);
// });

/* PUT user. */
router.put('/users/:id', authenticateToken, async (req, res, next) => {
  const { name, email } = req.body;
  const id = req.params.id;
  const updatedUser = await controller.updateUser({ name, email, id });

  res.status(201).json(updatedUser);
});

// TODO: change (patching) password
/* PATCH user. */
router.patch('/users/:id', authenticateToken, async (req, res, next) => {
  const { name, email } = req.body;
  const id = req.params.id;
  const updatedUser = await controller.updateUser2({ name, email, id });

  if (updatedUser) {
    res.status(201).json(updatedUser);
  } else {
    res.status(500).send('Internal server error');
  }
});

/* DELETE user. */
router.delete('/users/:id', authenticateToken, async (req, res, next) => {
  const id = req.params.id;
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
// TODO: add error for bad request

module.exports = router;
