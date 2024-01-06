const {createConnection} = require('../config/connection');
const bcrypt = require('bcrypt');
async function createAdminAccount() {
  try {
    const connection = await createConnection();
    console.log('Connected to create admin account!');

    var createAdminSql = `
      INSERT INTO user (user_name, first_name, last_name, email, password, is_admin, role)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        user_name = VALUES(user_name),
        first_name = VALUES(first_name),
        last_name = VALUES(last_name),
        email = VALUES(email),
        password = VALUES(password),
        is_admin = VALUES(is_admin),
        role = VALUES(role);
    `;
    // hash password here
    const hash = await bcrypt.hash('admin', 10);

    // Replace these values with the actual admin details
    var adminDetails = [
      'admin', // user_name
      'Admin',     // first_name
      'User',      // last_name
      'admin@example.com', // email
      hash, // password (should be hashed)
      true,        // is_admin
      'Administrator' // role
    ];

    await connection.query(createAdminSql, adminDetails);
    console.log('Admin account created or updated.');

    await connection.end();
    console.log('Connection ended after creating admin account.');
  } catch (err) {
    console.error('Error creating admin account:', err);
  }
}

// export the function
module.exports = {createAdminAccount};

// Call the function to create an admin account
// createAdminAccount();