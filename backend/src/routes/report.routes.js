const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/payments', authMiddleware, reportController.getPaymentsReport);
router.get('/my-payments', authMiddleware, reportController.getMyPayments);

module.exports = router;
