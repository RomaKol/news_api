const db = require('../database/dbConnection');

class ImageController {
  async getImageById(id) {
    try {
      const image = await db.query(`SELECT id, title, image FROM images_t WHERE id = $1;`, [id]);

      return image.rows[0];
    } catch(error) {
      console.log('--error--getImageById--', error);
      return undefined;
    }
  }

  async deleteImage(id) {
    try {
      return await db.query(`DELETE FROM images_t WHERE id = $1;`, [id]);
    } catch(error) {
      console.log('--error--deleteImage--', error);
    }
  }
}

module.exports = new ImageController();
