const db = require('./src/config/db');
const fs = require('fs');
const path = require('path');

const runPerformanceIndexes = async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'performance.sql'), 'utf8');
    await db.query(sql);
    console.log('Performance indexes applied successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error applying indexes:', error);
    process.exit(1);
  }
};

runPerformanceIndexes();
