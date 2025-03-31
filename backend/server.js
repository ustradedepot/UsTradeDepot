const express = require('express');
const app = express();
const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PORT = 5050;

const JWT_SECRET = 'superSecretKey123'; // Change this to a stronger key if you'd like

app.use(express.json());
app.use(express.static(__dirname)); // Serve static files like admin.html, login.html

// ========== GET ALL PRODUCTS (admin panel) ==========
app.get('/api/admin/products', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Admin fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// ========== ADD NEW PRODUCT ==========
app.post('/api/admin/products', async (req, res) => {
  const { name, price, description, quantity, sku, item_number, order_number } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO products (name, price, description, quantity, sku, item_number, order_number) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, price, description, quantity, sku, item_number, order_number]
    );
    res.json({ success: true, product_id: result.insertId });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ success: false, error: 'Database insert error' });
  }
});

// ========== EDIT PRODUCT ==========
app.put('/api/admin/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, description, quantity, sku, item_number, order_number } = req.body;
  try {
    await db.query(
      'UPDATE products SET name=?, price=?, description=?, quantity=?, sku=?, item_number=?, order_number=? WHERE id=?',
      [name, price, description, quantity, sku, item_number, order_number, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ success: false, error: 'Database update error' });
  }
});

// ========== ADMIN LOGIN ==========
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Missing email or password' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ success: true, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});
const path = require('path');

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Send index.html when visiting root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`UsTradeDepot backend running on port ${PORT}`);
});

