const bcrypt = require('bcryptjs');
const db = require('./src/config/db');
require('dotenv').config();

async function reset() {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    // Update instructor
    await db.query(
      "UPDATE users SET password = $1 WHERE email = 'rajt97364@gmail.com'",
      [hashedPassword]
    );
    console.log("Instructor rajt97364@gmail.com password updated to 'password123'");

    // Update student
    await db.query(
      "UPDATE users SET password = $1 WHERE email = 'rajthakur49466@gmail.com'",
      [hashedPassword]
    );
    console.log("Student rajthakur49466@gmail.com password updated to 'password123'");

  } catch (err) {
    console.error('Password reset failed:', err);
  } finally {
    process.exit(0);
  }
}

reset();
