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

  async updateUser({ name, email, id }) {
    try {
      const updatedUser = await db.query(`UPDATE user_t set name = $1, email = $2 WHERE id = $3;`, [name, email, id]);

      return updatedUser.rows[0];
    } catch(error) {
      console.log('--error--', error);
    }
  }

  async deleteUser(id) {
    try {
      return await db.query(`DELETE FROM user_t WHERE id = $1;`, [id]);
    } catch(error) {
      console.log('--error--', error);
    }
  }
}

module.exports = new UserController();
