const { Pool } = require('pg');
require('dotenv').config({ path: '/Users/rajthakur/Desktop/UptoProject/backend/.env' });

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'xyz',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

async function checkRoles() {
  try {
    const res = await pool.query('SELECT id, name, email, role, is_approved FROM users');
    console.log('All Users and Roles:', res.rows);
  } catch (err) {
    console.error('Error fetching roles:', err);
  } finally {
    await pool.end();
  }
}

checkRoles();
