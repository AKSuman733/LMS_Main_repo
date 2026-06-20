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
<<<<<<< HEAD
router.get('/my-stats', authMiddleware, courseController.getUserDashboardStats);
=======
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
router.get('/instructor-courses', authMiddleware, courseController.getInstructorCourses);
router.post('/create', authMiddleware, courseController.createCourse);
router.get('/export/csv', authMiddleware, courseController.exportCourses);
router.post('/bulk-delete', authMiddleware, courseController.bulkDeleteCourses);
<<<<<<< HEAD
router.post('/create-checkout-session', authMiddleware, courseController.createCheckoutSession);
router.post('/create-payment-intent', authMiddleware, courseController.createPaymentIntent);
=======
<<<<<<< HEAD
router.post('/create-checkout-session', authMiddleware, courseController.createCheckoutSession);
router.post('/create-payment-intent', authMiddleware, courseController.createPaymentIntent);
=======
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383

// Dynamic / Parameterized subroutes (Must be placed last to avoid conflicts)
router.get('/:id', courseController.getCourseById);
router.put('/:id', authMiddleware, courseController.updateCourse);
router.delete('/:id', authMiddleware, courseController.deleteCourse);

module.exports = router;
