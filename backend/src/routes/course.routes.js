const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Static / Concrete subroutes
router.get('/', courseController.getAllCourses);
router.post('/enroll', authMiddleware, courseController.enrollInCourse);
router.post('/update-progress', authMiddleware, courseController.updateProgress);
router.get('/progress/:course_id', authMiddleware, courseController.getCourseProgress);
router.get('/my-enrollments', authMiddleware, courseController.getUserEnrollments);
router.get('/my-stats', authMiddleware, courseController.getUserDashboardStats);
router.get('/instructor-courses', authMiddleware, courseController.getInstructorCourses);
router.post('/create', authMiddleware, courseController.createCourse);
router.get('/export/csv', authMiddleware, courseController.exportCourses);
router.post('/bulk-delete', authMiddleware, courseController.bulkDeleteCourses);
router.post('/create-checkout-session', authMiddleware, courseController.createCheckoutSession);
router.post('/create-payment-intent', authMiddleware, courseController.createPaymentIntent);

// Dynamic / Parameterized subroutes (Must be placed last to avoid conflicts)
router.get('/:id', courseController.getCourseById);
router.put('/:id', authMiddleware, courseController.updateCourse);
router.delete('/:id', authMiddleware, courseController.deleteCourse);

module.exports = router;
