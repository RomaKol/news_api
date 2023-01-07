const db = require('../database/dbConnection');

class UserController {
  async createUser({ name, email, password }) {
    try {
      const createdUsers = await db.query(`INSERT INTO user_t(name, email, password) VALUES($1, $2, $3) RETURNING *;`, [name, email, password]);

      return createdUsers.rows[0];
    } catch (error) {
        console.log('--error--', error);
    }
  }

  async getUsers() {
    try {
      const users = await db.query(`SELECT id, name, email FROM user_t;`);

      return users.rows;
    } catch (error) {
      console.log('--error--', error);
    }
  }

  async getUserById(id) {
    try {
      const user = await db.query(`SELECT id, name, email FROM user_t WHERE id = $1;`, [id]);

      return user.rows[0];
    } catch(error) {
      console.log('--error--', error);
    }
  }

  async updateUser(req, res) {}

  async deleteUser(req, res) {}
}

module.exports = new UserController();
