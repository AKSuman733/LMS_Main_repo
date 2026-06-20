const { Pool } = require('pg');
require('dotenv').config({ path: '/Users/rajthakur/Desktop/UptoProject/backend/.env' });

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'xyz',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

async function checkDB() {
  try {
    const courses = await pool.query('SELECT id, title FROM courses');
    console.log('Courses:', courses.rows);

    const enrollments = await pool.query('SELECT * FROM enrollments');
    console.log('Enrollments:', enrollments.rows);

    const users = await pool.query('SELECT id, name, email FROM users');
    console.log('Users:', users.rows);
  } catch (err) {
    console.error('DB Check Error:', err);
  } finally {
    await pool.end();
  }
}

checkDB();
