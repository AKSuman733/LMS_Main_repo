const express = require('express');
const router = express.Router();
const celebrityController = require('../controllers/celebrity.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public or student routes
router.get('/public', (req, res, next) => {
  req.query.status = 'active'; // force active only
  next();
}, celebrityController.getAllCelebrities);

// Admin Routes (protect with authMiddleware and/or adminMiddleware if you have it)
router.get('/', authMiddleware, celebrityController.getAllCelebrities);
router.post('/', authMiddleware, celebrityController.createCelebrity);
<<<<<<< HEAD
// Specific routes first
=======
router.put('/:id', authMiddleware, celebrityController.updateCelebrity);

>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
router.put('/archive/:id', authMiddleware, celebrityController.archiveCelebrity);
router.put('/bulk-archive', authMiddleware, celebrityController.bulkArchiveCelebrities);

router.put('/restore/:id', authMiddleware, celebrityController.restoreCelebrity);
router.put('/bulk-restore', authMiddleware, celebrityController.bulkRestoreCelebrities);

<<<<<<< HEAD
router.post('/bulk-delete', authMiddleware, celebrityController.bulkDeleteCelebrities);

// Dynamic routes (with :id) must go last
router.put('/:id', authMiddleware, celebrityController.updateCelebrity);
router.delete('/:id', authMiddleware, celebrityController.deleteCelebrity);

=======
router.delete('/:id', authMiddleware, celebrityController.deleteCelebrity);
router.post('/bulk-delete', authMiddleware, celebrityController.bulkDeleteCelebrities);

>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
module.exports = router;
