const tokensController = require('../controllers/tokens');

const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  const callBack = (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.userId = decodedToken.userId;
    next();
  }

  await tokensController.verifyToken({ token, callBack });
};

module.exports = authenticateToken;
