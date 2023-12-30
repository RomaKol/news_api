const express = require('express');
const router = express.Router();
const controller = require('../controllers/articles');
const authenticateToken = require('../middlewares/authenticateToken');

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
      const user = await controller.getUserById(article.user_id);

      res.status(201).json({ article, user });
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
        res.status(201).send('User successfully deleted!');
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

// TODO: check and update creation
/* POST article creation */
router.post('/', authenticateToken, async (req, res, next) => {
  const { title, description, content, image } = req.body;
  if (!title || !description) {
    res.status(500).json({
      message: 'title, description are required!'
    });
  }
  try {
    const createdArticle = await controller.createArticle({ userId: req.userId, title, description, content, image });

    if (createdArticle) {
      res
        .status(201)
        .json({
          message: 'Article has been created successfully',
          article: createdArticle,
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
});

module.exports = router;
