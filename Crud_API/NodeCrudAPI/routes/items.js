const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getAllItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/itemsController');
const { authenticateToken } = require('../auth');

// File upload configuration
const upload = multer({ dest: 'uploads/' });

router.get('/', async (req, res) => {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const item = await getItemById(id);
    res.json(item);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  const { name, description, startingPrice, endTime } = req.body;
  const imageUrl = req.file ? req.file.path : null;
  try {
    const itemId = await createItem(name, description, startingPrice, endTime, imageUrl);
    res.status(201).json({ itemId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, description, startingPrice, endTime, imageUrl } = req.body;
  try {
    await updateItem(id, name, description, startingPrice, endTime, imageUrl);
    res.status(200).json({ message: 'Item updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await deleteItem(id);
    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
