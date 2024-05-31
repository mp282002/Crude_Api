const express = require('express');
const router = express.Router({ mergeParams: true });
const { getAllBidsForItem, placeBid } = require('../controllers/bidsController');
const { authenticateToken } = require('../auth');

router.get('/', async (req, res) => {
  const { itemId } = req.params;
  try {
    const bids = await getAllBidsForItem(itemId);
    res.json(bids);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const { itemId } = req.params;
  const { bidAmount } = req.body;
  const userId = req.userId;
  try {
    await placeBid(itemId, userId, bidAmount);
    res.status(201).json({ message: 'Bid placed' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
