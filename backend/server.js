const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const db = require('./db');

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/products', require('./routes/products'));
app.use('/api/checkout', require('./routes/dbroutecheckout'));

// Fallback route for single-page app (after static + API)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start the server
const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

