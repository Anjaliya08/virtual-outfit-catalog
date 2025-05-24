const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // Expecting "Bearer <token>"

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id: user._id }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
