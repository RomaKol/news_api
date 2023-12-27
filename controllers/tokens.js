const db = require('../database/dbConnection');
const jwt = require('jsonwebtoken');

const jwtSecretKey = 'mega-secret-key';

class TokenController {
  async createToken({ userId }) {
    try {
      const token = jwt.sign({ userId }, jwtSecretKey, { expiresIn: '1h' });
      const createdToken = await db.query(`INSERT INTO tokens_t(user_id, token) VALUES($1, $2) RETURNING *;`, [userId, token]);

      return token;
    } catch (error) {
        console.log('--error--createToken--', error);
    }
  };

  async verifyToken({ token, callBack }) {
    try {
      jwt.verify(token, jwtSecretKey, callBack);
    } catch (error) {
        console.log('--error--verifyToken--', error);
    }
  };

  async deleteToken({ token }) {
    try {
      return await db.query(`DELETE FROM token_t WHERE token = $1;`, [token]);
    } catch (error) {
      console.log('--error--deleteToken--', error);
  }
  };
}

module.exports = new TokenController();
