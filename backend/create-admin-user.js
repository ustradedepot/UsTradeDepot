const bcrypt = require('bcrypt');
const db = require('./db');

const email = 'lizardfish101@gmail.com';
const plainPassword = 'AdminLetMeIn';
const name = 'Mark Messina';

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const [result] = await db.query(
      'INSERT INTO users (email, password, name, is_admin) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, name, true]
    );
    console.log('Admin user created with ID:', result.insertId);
    process.exit();
  } catch (err) {
    console.error('Error creating admin user:', err);
    process.exit(1);
  }
}

createAdmin();
