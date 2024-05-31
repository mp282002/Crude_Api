const jwt = require('jsonwebtoken');
const secret = req.headers['authorization'];

function generateToken(user) {
  return jwt.sign({ userId: user.id, role: user.role }, secret, { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  try {
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
}

module.exports = { generateToken, verifyToken, authenticateToken };
