const { pool } = require('../config/db');

const createNotification = async (userId, title, message, type = 'info') => {
  try {
    if (!userId) return; // Don't crash if user ID is missing
    await pool.query(
      'INSERT INTO notifications (user_id, title, message, type) VALUES ($1, $2, $3, $4)',
      [userId, title, message, type]
    );
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

const notifyAllAdmins = async (title, message, type = 'info') => {
  try {
    const admins = await pool.query("SELECT id FROM users WHERE role = 'admin'");
    for (const admin of admins.rows) {
      await createNotification(admin.id, title, message, type);
    }
  } catch (error) {
    console.error('Error notifying admins:', error);
  }
};

const notifyAllStudents = async (title, message, type = 'info') => {
  try {
    const students = await pool.query("SELECT id FROM users WHERE role = 'user'");
    for (const student of students.rows) {
      await createNotification(student.id, title, message, type);
    }
  } catch (error) {
    console.error('Error notifying students:', error);
  }
};

module.exports = {
  createNotification,
  notifyAllAdmins,
  notifyAllStudents
};
