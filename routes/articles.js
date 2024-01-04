const express = require('express');
const router = express.Router();
const controller = require('../controllers/articles');
const userController = require('../controllers/users');
const imageController = require('../controllers/images');
const authenticateToken = require('../middlewares/authenticateToken');
const multer = require('multer');

// Multer configuration for handling file uploads
const storage = multer.memoryStorage(); // Store images in memory
const upload = multer({ storage: storage });

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const articles = await controller.getArticles();

  res.status(201).json(articles);
});

/* GET article by ID. */
router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const article = await controller.getArticleById(id);

    if (article) {
      const user = await userController.getUserById(article.user_id);
      const image = await imageController.getImageById(article.image_id);

      res.status(201).json({ article, user, image });
    } else {
      res.status(404).send('Article not found!');
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

/* DELETE article by ID. */
router.delete('/:id', authenticateToken, async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const article = await controller.getArticleById(id);

    if (req.userId === article.user_id) {
      const result = await controller.deleteArticle(id);

      if (result.rowCount > 0) {
        res.status(201).send('Article successfully deleted!');
      } else {
        res.status(500).send('Something went wrong!');
      }

    } else {
      res.status(500).send('You don\'t have permissions to delete this user!');
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

/* POST article creation */
router.post('/', authenticateToken, async (req, res, next) => {
  const { title, description, content, imageId } = req.body;
  if (!title || !description || !content) {
    res.status(500).json({
      message: 'title, description, content are required!'
    });
  } else {
    try {
      const createdArticle = await controller.createArticle({userId: req.userId, title, description, content, imageId});

      if (createdArticle) {
        let image = null;
        if (imageId) {
          image = await imageController.getImageById(imageId);
        }
        res
          .status(201)
          .json({
            message: 'Article has been created successfully',
            article: createdArticle,
            image,
          });
      } else {
        res.status(500).json({
          message: 'Something went wrong'
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error'
      });
    }
  }
});

/* POST image creation */
router.post('/image', authenticateToken, upload.single('image'), async (req, res, next) => {
  const { title } = req.body;
  const image = req.file.buffer; // Image data from multer
  if (!title) {
    res.status(500).json({
      message: 'title is required!'
    });
  } else {
    try {
      const createdImage = await controller.createImage({userId: req.userId, title, image});

      if (createdImage) {
        res
          .status(201)
          .json({
            message: 'Image has been uploaded successfully',
            image: createdImage,
          });
      } else {
        res.status(500).json({
          message: 'Something went wrong'
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error'
      });
    }
  }
});

module.exports = router;
