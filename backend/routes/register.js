const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// POST /api/register
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Check if email already exists
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, false]
    );

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

