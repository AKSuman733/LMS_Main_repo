const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { sendOTPEmail, sendLoginOTPEmail } = require('../utils/email.utils');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userRole = role || 'student'; // Default to student if no role provided

  if (userRole === 'instructor') {
    return res.status(400).json({ error: 'Instructor registration is not allowed' });
  }

  try {
    // Validate name (only letters and spaces allowed)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!name || !nameRegex.test(name.trim())) {
      return res.status(400).json({ error: 'Full name can only contain letters and spaces' });
    }

    // Check if user exists
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    const newUser = await db.query(
      'INSERT INTO users (name, email, password, role, is_approved) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role, is_approved',
      [name, email, hashedPassword, userRole, false]
    );

    res.status(201).json({
      message: 'Registration successful. Please wait for admin approval.',
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    if (user.rows[0].role === 'instructor') {
      return res.status(403).json({ error: 'Instructor login is disabled' });
    }

    if (!user.rows[0].is_approved) {
      return res.status(403).json({ error: 'Your account is pending admin approval' });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      // Check temp password or OTP
      if ((user.rows[0].temp_password && password === user.rows[0].temp_password) || 
          (user.rows[0].otp && password === user.rows[0].otp)) {
        // Allow login with temp password or OTP
      } else {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
    }

    const token = jwt.sign(
      { id: user.rows[0].id, role: user.rows[0].role },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: process.env.JWT_EXPIRE || '1h' }
    );

    res.status(200).json({
      token,
      user: {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

exports.getPendingUsers = async (req, res) => {
  try {
    const users = await db.query('SELECT id, name, email, role, created_at FROM users WHERE is_approved = FALSE');
    res.status(200).json(users.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pending users' });
  }
};

exports.approveUser = async (req, res) => {
  const { userId } = req.params;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP

  try {
    // Get user email
    const user = await db.query('SELECT email FROM users WHERE id = $1', [userId]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    await db.query(
      'UPDATE users SET is_approved = TRUE, otp = $1 WHERE id = $2',
      [otp, userId]
    );

    // Send email with OTP in the background (non-blocking for super fast response)
    sendOTPEmail(user.rows[0].email, otp).catch(err => {
      console.error('Failed to send OTP email in background:', err);
    });

    res.status(200).json({ message: 'User approved and OTP sent via email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error approving user or sending email' });
  }
};

exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.rows[0].is_approved) {
      return res.status(403).json({ error: 'Your account is pending admin approval' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await db.query(
      'UPDATE users SET otp = $1, otp_expiry = $2 WHERE email = $3',
      [otp, otpExpiry, email]
    );

    // Send email with OTP in the background (non-blocking for super fast response)
    sendLoginOTPEmail(email, otp).catch(err => {
      console.error('Failed to send login OTP email in background:', err);
    });

    res.status(200).json({ message: 'OTP sent to your email. Valid for 5 minutes.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending OTP' });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.rows[0].otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    const now = new Date();
    if (user.rows[0].otp_expiry && user.rows[0].otp_expiry < now) {
      return res.status(400).json({ error: 'OTP has expired' });
    }

    // Clear OTP after successful verification
    await db.query('UPDATE users SET otp = NULL, otp_expiry = NULL WHERE email = $1', [email]);

    const token = jwt.sign(
      { id: user.rows[0].id, role: user.rows[0].role },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: process.env.JWT_EXPIRE || '1h' }
    );

    res.status(200).json({
      token,
      user: {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error verifying OTP' });
  }
};

exports.googleSuccess = async (req, res) => {
  if (req.user) {
    const token = jwt.sign(
      { id: req.user.id, role: req.user.role },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: process.env.JWT_EXPIRE || '1h' }
    );
    
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}&user=${JSON.stringify(req.user)}`);
  } else {
    res.redirect(`${process.env.FRONTEND_URL}/login?error=Google auth failed`);
  }
};
exports.getAdminStats = async (req, res) => {
  try {
    const userCount = await db.query("SELECT COUNT(*) FROM users WHERE role = 'student'");
    const adminCount = await db.query("SELECT COUNT(*) FROM users WHERE role = 'admin'");
    const instructorCount = await db.query("SELECT COUNT(*) FROM users WHERE role = 'instructor'");
    const enrollmentCount = await db.query("SELECT COUNT(*) FROM enrollments");
    const courseCount = await db.query("SELECT COUNT(*) FROM courses");
    
    // Real metrics for new KPI cards
    const pendingCount = await db.query("SELECT COUNT(*) FROM users WHERE is_approved = FALSE");
    
    const recentEnrollments = await db.query(`
      SELECT COUNT(*) FROM enrollments 
      WHERE enrolled_at >= NOW() - INTERVAL '7 days'
    `);

    const progressAvg = await db.query(`
      SELECT COALESCE(AVG(p.progress_pct), 0) as avg_progress
      FROM (
        SELECT 
          (COUNT(pr.lesson_id)::float / NULLIF(COUNT(l.id), 0) * 100) as progress_pct
        FROM enrollments e
        LEFT JOIN lessons l ON e.course_id = l.course_id
        LEFT JOIN progress pr ON e.user_id = pr.user_id AND l.id = pr.lesson_id AND pr.status = 'completed'
        GROUP BY e.user_id, e.course_id
      ) p
    `);

    const categoriesQuery = await db.query(`
      SELECT category as name, COUNT(*)::int as value 
      FROM courses 
      GROUP BY category
    `);

    const dailyMetricsQuery = await db.query(`
      WITH last_7_days AS (
        SELECT generate_series(CURRENT_DATE - INTERVAL '6 days', CURRENT_DATE, '1 day'::interval)::date AS date
      )
      SELECT 
        to_char(d.date, 'Dy') as name, 
        COUNT(e.id)::int as enrollments
      FROM last_7_days d
      LEFT JOIN enrollments e ON DATE(e.enrolled_at) = d.date
      GROUP BY d.date
      ORDER BY d.date
    `);

    res.status(200).json({
      users: parseInt(userCount.rows[0].count),
      admins: parseInt(adminCount.rows[0].count),
      instructors: parseInt(instructorCount.rows[0].count),
      enrollments: parseInt(enrollmentCount.rows[0].count),
      courses: parseInt(courseCount.rows[0].count),
      pendingApprovals: parseInt(pendingCount.rows[0].count),
      recentEnrollments: parseInt(recentEnrollments.rows[0].count),
      completionRate: Math.round(progressAvg.rows[0].avg_progress) || 0,
      systemHealth: 'Optimal',
      categories: categoriesQuery.rows,
      dailyMetrics: dailyMetricsQuery.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching admin statistics' });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const query = `
      SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.created_at as joined_at,
        u.is_approved,
        COUNT(DISTINCT e.course_id) as courses_count,
        COALESCE(AVG(p.progress_pct), 0) as average_progress
      FROM users u
      LEFT JOIN enrollments e ON u.id = e.user_id
      LEFT JOIN (
        SELECT 
          e2.user_id, 
          e2.course_id,
          (COUNT(pr.lesson_id)::float / NULLIF(COUNT(l.id), 0) * 100) as progress_pct
        FROM enrollments e2
        LEFT JOIN lessons l ON e2.course_id = l.course_id
        LEFT JOIN progress pr ON e2.user_id = pr.user_id AND l.id = pr.lesson_id AND pr.status = 'completed'
        GROUP BY e2.user_id, e2.course_id
      ) p ON u.id = p.user_id
      WHERE u.role = 'student'
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `;
    const students = await db.query(query);
    res.status(200).json(students.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching student management data' });
  }
};

exports.getAllInstructors = async (req, res) => {
  try {
    const query = `
      SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.created_at as joined_at,
        u.is_approved,
        COUNT(DISTINCT c.id) as courses_count,
        COALESCE(STRING_AGG(DISTINCT c.title, ', '), 'No courses yet') as courses_list
      FROM users u
      LEFT JOIN courses c ON u.id = c.instructor_id
      WHERE u.role = 'instructor'
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `;
    const instructors = await db.query(query);
    res.status(200).json(instructors.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching instructor management data' });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await db.query(
      'UPDATE users SET otp = $1, otp_expiry = $2 WHERE email = $3',
      [otp, otpExpiry, email]
    );

    // Reusing sendLoginOTPEmail but with reset context in background (non-blocking for super fast response)
    sendLoginOTPEmail(email, otp).catch(err => {
      console.error('Failed to send reset OTP email in background:', err);
    }); 

    res.status(200).json({ message: 'Password reset OTP sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending reset OTP' });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.rows[0].otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    const now = new Date();
    if (user.rows[0].otp_expiry && user.rows[0].otp_expiry < now) {
      return res.status(400).json({ error: 'OTP has expired' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await db.query(
      'UPDATE users SET password = $1, otp = NULL, otp_expiry = NULL WHERE email = $2',
      [hashedPassword, email]
    );

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error resetting password' });
  }
};

