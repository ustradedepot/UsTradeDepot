const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all categories
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories ORDER BY name ASC');
    res.json(rows);
  } catch (err) {
    console.error('GET /categories error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// ADD a category
router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Category name is required' });

  try {
    const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
    console.error('POST /categories error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// UPDATE a category
router.put('/:id', async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  if (!name) return res.status(400).json({ error: 'Category name is required' });

  try {
    const [result] = await db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
    res.json({ success: result.affectedRows > 0 });
  } catch (err) {
    console.error('PUT /categories error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE a category
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);
    res.json({ success: result.affectedRows > 0 });
  } catch (err) {
    console.error('DELETE /categories error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;









