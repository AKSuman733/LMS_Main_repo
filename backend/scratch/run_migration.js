const fs = require('fs');
const path = require('path');
const { pool } = require('../src/config/db');

const runMigration = async () => {
  try {
    const schemaPath = path.join(__dirname, '../schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Running migration...');
    await pool.query(sql);
    console.log('Migration successful!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
};

runMigration();
