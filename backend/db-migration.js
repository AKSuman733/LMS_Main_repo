const db = require('./src/config/db');
(async () => {
  try {
    console.log('Starting DB migration...');
    await db.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT FALSE;');
    console.log('Updated users table.');

    await db.query(`
      CREATE TABLE IF NOT EXISTS celebrities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        bio TEXT,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_archived BOOLEAN DEFAULT FALSE,
        is_deleted BOOLEAN DEFAULT FALSE
      );
    `);
    console.log('Created celebrities table.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    process.exit();
  }
})();
