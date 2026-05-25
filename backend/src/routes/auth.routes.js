const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

const authMiddleware = require('../middleware/auth.middleware');
const passport = require('passport');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTP);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// Google Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  authController.googleSuccess
);

// Admin Routes
router.get('/pending-users', authMiddleware, authController.getPendingUsers);
router.post('/approve-user/:userId', authMiddleware, authController.approveUser);
router.get('/stats', authMiddleware, authController.getAdminStats);
router.get('/all-students', authMiddleware, authController.getAllStudents);
router.get('/all-instructors', authMiddleware, authController.getAllInstructors);

module.exports = router;
