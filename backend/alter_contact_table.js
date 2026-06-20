const { pool } = require('./src/config/db');

async function alterTable() {
  try {
    await pool.query(`
      ALTER TABLE contact_queries 
      ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'Pending',
      ADD COLUMN IF NOT EXISTS admin_reply TEXT;
    `);
    console.log('contact_queries table altered successfully');
  } catch (err) {
    console.error('Error altering table:', err);
  } finally {
    await pool.end();
  }
}

alterTable();
