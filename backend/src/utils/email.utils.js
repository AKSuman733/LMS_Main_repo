const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.transporter = transporter;

exports.sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: `"UptoSkills" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Account Has Been Approved - Login OTP',
    text: `Hello,\n\nYour account on UptoSkills Platform has been approved.\n\nYou can now log in using the following One-Time Password (OTP):\n${otp}\n\nAlternatively, you can use the password you registered with.\n\nHappy learning!\n\nThis is an automated email. Please do not reply.`,
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Account Approved</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9f9f9;">
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; padding: 30px; border-radius: 8px;">
    <h2 style="color: #FF6B35; text-align: center; margin-bottom: 20px;">Account Approved!</h2>
    <p style="color: #333333; font-size: 16px; line-height: 1.5;">Hello,</p>
    <p style="color: #333333; font-size: 16px; line-height: 1.5;">Your account on the UptoSkills Platform has been approved by the administrator.</p>
    <p style="color: #333333; font-size: 16px; line-height: 1.5;">You can now log in using the following One-Time Password (OTP):</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; background: #f4f4f4; padding: 15px 25px; border-radius: 8px; color: #1e293b; display: inline-block;">
        ${otp}
      </span>
    </div>
    <p style="color: #333333; font-size: 16px; line-height: 1.5;">Alternatively, you can use the password you registered with.</p>
    <p style="color: #333333; font-size: 16px; line-height: 1.5;">Happy learning!</p>
    <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 30px 0;">
    <p style="font-size: 12px; color: #888888; text-align: center;">This is an automated email from UptoSkills. Please do not reply.</p>
  </div>
</body>
</html>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send OTP email');
  }
};

exports.sendLoginOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: `"UptoSkills" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Login OTP - UptoSkills',
    text: `Hello,\n\nYour One-Time Password (OTP) for logging into UptoSkills is:\n${otp}\n\nThis OTP is valid for 5 minutes. Please do not share it with anyone.\n\nIf you didn't request this, please ignore this email.\n\nThis is an automated email. Please do not reply.`,
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Login OTP</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9f9f9;">
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; padding: 30px; border-radius: 8px;">
    <h2 style="color: #FF6B35; text-align: center; margin-bottom: 20px;">UptoSkills Login OTP</h2>
    <p style="color: #333333; font-size: 16px; line-height: 1.5;">Hello,</p>
    <p style="color: #333333; font-size: 16px; line-height: 1.5;">Your One-Time Password (OTP) for logging into the platform is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; background: #f4f4f4; padding: 15px 25px; border-radius: 8px; color: #1e293b; display: inline-block;">
        ${otp}
      </span>
    </div>
    <p style="color: #333333; font-size: 16px; line-height: 1.5;">This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone.</p>
    <p style="color: #333333; font-size: 16px; line-height: 1.5;">If you didn't request this, please safely ignore this email.</p>
    <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 30px 0;">
    <p style="font-size: 12px; color: #888888; text-align: center;">This is an automated email from UptoSkills. Please do not reply.</p>
  </div>
</body>
</html>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Login OTP Email sent successfully');
  } catch (error) {
    console.error('Error sending login OTP email:', error);
    throw new Error('Failed to send login OTP email');
  }
};
