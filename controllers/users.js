const db = require('../database/db');

class UserController {
  async createUser(req, res) {
    const { name, email, password } = req.body;

    try {
        const newUser = await db.query(`INSERT INTO user_t(name, email, password) VALUES($1, $2, $3) RETURNING *;`, [name, email, password]);

        console.log('newUser', newUser);

        res.json(newUser);
    } catch (error) {
        console.log('--error--', error);
    }
  }

  async getUsers(req, res) {
      res.send('respond with a resource');
  }

  async getUserById(req, res) {}

  async updateUser(req, res) {}

  async deleteUser(req, res) {}
}

module.exports = new UserController();
