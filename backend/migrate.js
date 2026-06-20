const { Pool } = require('pg');
require('dotenv').config({ path: '/Users/rajthakur/Desktop/UptoProject/backend/.env' });

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'xyz',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

async function migrate() {
  try {
    console.log('Starting migration...');

    // Add celebrity column to courses table
    await pool.query('ALTER TABLE courses ADD COLUMN IF NOT EXISTS celebrity VARCHAR(100);');
    console.log('Successfully added celebrity column to courses table');

    // Let's verify the columns of the courses table
    const result = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'courses'");
    console.log('Courses table columns:', result.rows.map(r => r.column_name));

  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await pool.end();
    console.log('Migration process finished');
  }
}

migrate();
