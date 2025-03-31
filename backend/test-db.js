const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'utrader',
  password: 'UltraSecureP@ssw0rd!',
  database: 'ustradedepot_db'
});

connection.connect(err => {
  if (err) {
    console.error('Connection failed:', err.message);
    return;
  }
  console.log('MySQL connection successful!');
  connection.end();
});
