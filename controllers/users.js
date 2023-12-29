const db = require('../database/dbConnection');

class UserController {
  async createUser({ name, email, password }) {
    try {
      const createdUsers = await db.query(`INSERT INTO user_t(name, email, password) VALUES($1, $2, $3) RETURNING *;`, [name, email, password]);

      return createdUsers.rows[0];
    } catch (error) {
        console.log('--error--createUser--', error);
    }
  }

  async getUsers() {
    try {
      const users = await db.query(`SELECT id, name, email FROM user_t;`);

      return users.rows;
    } catch (error) {
      console.log('--error--getUsers--', error);
    }
  }

  async getUserById(id) {
    try {
      const user = await db.query(`SELECT id, name, email FROM user_t WHERE id = $1;`, [id]);

      return user.rows[0];
    } catch(error) {
      console.log('--error--getUserById--', error);
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await db.query(`SELECT id, name, email, password FROM user_t WHERE email = $1;`, [email]);

      return user.rows[0];
    } catch(error) {
      console.log('--error--getUserByEmail--', error);
    }
  }

  async updateUser({ name, email, id }) {
    try {
      const updatedUser = await db.query(`UPDATE user_t set name = $1, email = $2 WHERE id = $3;`, [name, email, id]);

      return updatedUser.rowCount;
    } catch(error) {
      console.log('--error--updateUser--', error);
    }
  }

  async updateUser2({ id, name, email, password }) {
    console.log('--passowrd--', password);
    try {
      const queryResult = await db.query(
        `UPDATE user_t SET name = COALESCE($2, name), email = COALESCE($3, email), password = COALESCE($4, password) WHERE id = $1 RETURNING *`,
        [id, name, email, password]
      );
      const updatedUser = queryResult.rows[0];

      return updatedUser;
    } catch(error) {
      console.log('--error--updateUser2--', error);
      throw error;
    }
  }

  // TODO: refactor
  // async updateUser2({ name, email, id }) {
  //   try {
  //     // Start a client transaction to update the user data
  //     const client = await db.connect();
      
  //     try {
  //       await client.query('BEGIN');

  //       const queryResult = await client.query(`UPDATE user_t set name = $1, email = $2 WHERE id = $3;`, [name, email, id]);
  //       console.log('--queryResult--', queryResult);
  //       const updatedUser = queryResult.rows[0];

  //       // Commit the transaction and release the client connection
  //       await client.query('COMMIT');
  //       client.release();
        
  //       // Return the updated user object as a JSON response
  //       return updatedUser;
  //     } catch(error) {
  //       console.log('--error--updateUser2--', error);
  //       // Roll back the transaction and release the client connection in case of error
  //       await client.query('ROLLBACK');
  //       client.release();
  //       throw error;
  //     }

  //   } catch (err) {
  //     console.error('==error--updateUser2==', err);
  //   }
  // }

  async deleteUser(id) {
    try {
      return await db.query(`DELETE FROM user_t WHERE id = $1;`, [id]);
    } catch(error) {
      console.log('--error--deleteUser--', error);
    }
  }
}

module.exports = new UserController();
