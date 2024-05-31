const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/usersController');
const { authenticateToken } = require('../auth');

router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const userId = await registerUser(username, password, email);
    res.status(201).json({ userId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userData = await loginUser(username, password);
    res.json(userData);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get('/profile', authenticateToken, async (req, res) => {
  const userId = req.userId;
  try {
    const userProfile = await getUserProfile(userId);
    res.json(userProfile);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
