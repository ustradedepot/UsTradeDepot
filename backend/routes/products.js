const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all products (optionally filtered by category)
router.get('/', async (req, res) => {
  const categoryId = req.query.category_id;
  try {
    let query = 'SELECT * FROM products';
    let params = [];

    if (categoryId) {
      query += ' WHERE category_id = ?';
      params.push(categoryId);
    }

    const [products] = await db.query(query, params);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Server error fetching products' });
  }
});

module.exports = router;
