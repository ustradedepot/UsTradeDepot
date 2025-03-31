const bcrypt = require('bcrypt');

const password = 'UltraSecureP@ssw0rd!';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log('Hashed password:', hash);
});

