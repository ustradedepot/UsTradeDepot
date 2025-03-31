const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'utrader',
  password: 'UltraSecureP@ssw0rd!',
  database: 'ustradedepot_db',
});

module.exports = pool;

