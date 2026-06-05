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
router.put('/:id', authMiddleware, celebrityController.updateCelebrity);

router.put('/archive/:id', authMiddleware, celebrityController.archiveCelebrity);
router.put('/bulk-archive', authMiddleware, celebrityController.bulkArchiveCelebrities);

router.put('/restore/:id', authMiddleware, celebrityController.restoreCelebrity);
router.put('/bulk-restore', authMiddleware, celebrityController.bulkRestoreCelebrities);

router.delete('/:id', authMiddleware, celebrityController.deleteCelebrity);
router.post('/bulk-delete', authMiddleware, celebrityController.bulkDeleteCelebrities);

module.exports = router;
