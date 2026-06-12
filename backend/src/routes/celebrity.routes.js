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
// Specific routes first
router.put('/archive/:id', authMiddleware, celebrityController.archiveCelebrity);
router.put('/bulk-archive', authMiddleware, celebrityController.bulkArchiveCelebrities);

router.put('/restore/:id', authMiddleware, celebrityController.restoreCelebrity);
router.put('/bulk-restore', authMiddleware, celebrityController.bulkRestoreCelebrities);

router.post('/bulk-delete', authMiddleware, celebrityController.bulkDeleteCelebrities);

// Dynamic routes (with :id) must go last
router.put('/:id', authMiddleware, celebrityController.updateCelebrity);
router.delete('/:id', authMiddleware, celebrityController.deleteCelebrity);

module.exports = router;
