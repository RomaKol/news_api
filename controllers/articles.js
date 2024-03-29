const db = require('../database/dbConnection');

class ArticlesController {
  async getArticles() {
    try {
      const articles = await db.query(`SELECT id, date_creation, title, description, image_id FROM articles_t;`);

      return articles.rows;
    } catch (error) {
      console.log('--error--getArticles--', error);
    }
  }

  async getArticleById(id) {
    try {
      const articles = await db.query(`SELECT id, user_id, date_creation, title, description, content, image_id FROM articles_t WHERE id = $1;`, [id]);

      return articles.rows[0];
    } catch(error) {
      console.log('--error--getArticleById--', error);
      return undefined;
    }
  }

  async deleteArticle(id) {
    try {
      return await db.query(`DELETE FROM articles_t WHERE id = $1;`, [id]);
    } catch(error) {
      console.log('--error--deleteUser--', error);
    }
  }

  async createArticle({ userId, title, description, content, imageId }){
    try {
      const createdArticles = await db.query(
        `INSERT INTO articles_t(user_id, title, description, content, image_id) VALUES($1, $2, $3, $4, $5) RETURNING *;`,
        [userId, title, description, content, imageId]
      );

      return createdArticles.rows[0];
    } catch (error) {
      console.log('--error--createArticle--', error);
      throw error;
    }
  }

  async createImage({ userId, title, image }){
    try {
      const createdImages = await db.query(
        `INSERT INTO images_t(user_id, title, image) VALUES($1, $2, $3) RETURNING *;`,
        [userId, title, image]
      );

      return createdImages.rows[0];
    } catch (error) {
      console.log('--error--createImage--', error);
      throw error;
    }
  }
}

module.exports = new ArticlesController();
