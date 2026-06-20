const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');

// Chatbot route (public so anyone can ask questions)
router.post('/', chatController.chatWithBot);

module.exports = router;
