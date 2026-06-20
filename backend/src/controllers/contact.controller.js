const db = require('../config/db');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
<<<<<<< HEAD
const notificationUtil = require('../utils/notification.util');
=======
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383

exports.submitContactQuery = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, queryType, subject, message } = req.body;
    let attachmentUrl = null;

    if (req.file) {
      attachmentUrl = `/uploads/${req.file.filename}`;
    }

    // Basic backend validation
    if (!fullName || !email || !phoneNumber || !queryType || !subject || !message) {
      return res.status(400).json({ error: 'All fields except attachment are required' });
    }

    const result = await db.query(
      `INSERT INTO contact_queries 
      (full_name, email, phone_number, query_type, subject, message, attachment_url) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [fullName, email, phoneNumber, queryType, subject, message, attachmentUrl]
    );
<<<<<<< HEAD
    
    await notificationUtil.notifyAllAdmins('New Support Query', `A new support query regarding "${subject}" was submitted by ${fullName}.`, 'warning');
=======
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383

    res.status(201).json({ 
      success: true, 
      message: 'Query submitted successfully', 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Submit contact query error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAdminQueries = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM contact_queries ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Fetch admin queries error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getStudentQueries = async (req, res) => {
  try {
    const userResult = await db.query('SELECT email FROM users WHERE id = $1', [req.user.id]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const email = userResult.rows[0].email;
    const result = await db.query('SELECT * FROM contact_queries WHERE email = $1 ORDER BY created_at DESC', [email]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Fetch student queries error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.replyToQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).json({ error: 'Reply message is required' });
    }

    const queryResult = await db.query('SELECT * FROM contact_queries WHERE id = $1', [id]);
    if (queryResult.rows.length === 0) {
      return res.status(404).json({ error: 'Query not found' });
    }

    const queryInfo = queryResult.rows[0];

    const result = await db.query(
      `UPDATE contact_queries SET admin_reply = $1, status = 'Answered' WHERE id = $2 RETURNING *`,
      [reply, id]
    );

<<<<<<< HEAD
    // Notify the user if they exist in the system
    const userResult = await db.query('SELECT id FROM users WHERE email = $1', [queryInfo.email]);
    if (userResult.rows.length > 0) {
      await notificationUtil.createNotification(userResult.rows[0].id, 'Support Query Answered', `An admin has replied to your query: "${queryInfo.subject}".`, 'success');
    }

    // Send email using shared pooled transporter in the background (non-blocking)
    const mailOptions = {
      from: `"UptoSkills Support" <${process.env.EMAIL_USER}>`,
      to: queryInfo.email,
      subject: `Re: ${queryInfo.subject} (UptoSkills Support)`,
      text: `Hello ${queryInfo.full_name},\n\nRegarding your query:\n"${queryInfo.message}"\n\nAdmin Reply:\n${reply}\n\nBest regards,\nUptoSkills Support Team`,
      html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; color: #333;">
  <h3>Hello ${queryInfo.full_name},</h3>
  <p>Regarding your query: <em>"${queryInfo.message}"</em></p>
  <div style="background: #f4f4f4; padding: 15px; border-left: 4px solid #FF6B35; margin: 20px 0;">
    <strong>Admin Reply:</strong><br/>
    ${reply}
  </div>
  <p>Best regards,<br/><strong>UptoSkills Support Team</strong></p>
</body>
</html>`
    };

    const { transporter } = require('../utils/email.utils');
    transporter.sendMail(mailOptions).catch(mailErr => {
      console.error('Error sending email:', mailErr);
    });
=======
    // Send email using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: '"UptoSkills Support" <support@uptoskills.com>',
      to: queryInfo.email,
      subject: `Re: ${queryInfo.subject} (UptoSkills Support)`,
      text: `Hello ${queryInfo.full_name},\n\nRegarding your query:\n"${queryInfo.message}"\n\nAdmin Reply:\n${reply}\n\nBest regards,\nUptoSkills Support Team`
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (mailErr) {
      console.error('Error sending email:', mailErr);
      // Proceed even if email fails in dev
    }
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Reply to query error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
