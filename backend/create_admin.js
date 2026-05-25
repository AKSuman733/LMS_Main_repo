const bcrypt = require('bcryptjs');
const db = require('./src/config/db');
require('dotenv').config();

async function createAdmin(name, email, password) {
  try {
    // 1. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 2. Start a transaction
    const client = await db.pool.connect();
    try {
      await client.query('BEGIN');

      // 3. Downgrade any existing admins to 'student' (to keep only one admin)
      await client.query("UPDATE users SET role = 'student' WHERE role = 'admin'");
      console.log('Existing admins downgraded to student.');

      // 4. Check if user already exists
      const userExists = await client.query('SELECT * FROM users WHERE email = $1', [email]);
      
      if (userExists.rows.length > 0) {
        // Update existing user to admin
        await client.query(
          "UPDATE users SET name = $1, password = $2, role = 'admin', is_approved = TRUE WHERE email = $3",
          [name, hashedPassword, email]
        );
        console.log(`User ${email} updated to Admin and approved.`);
      } else {
        // Create new admin user
        await client.query(
          "INSERT INTO users (name, email, password, role, is_approved) VALUES ($1, $2, $3, 'admin', TRUE)",
          [name, email, hashedPassword]
        );
        console.log(`New Admin user ${email} created and approved.`);
      }

      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }

    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
}

// Get arguments from command line
const args = process.argv.slice(2);
if (args.length < 3) {
  console.log('Usage: node create_admin.js <name> <email> <password>');
  process.exit(1);
}

const [name, email, password] = args;
createAdmin(name, email, password);
