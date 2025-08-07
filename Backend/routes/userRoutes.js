const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Register
router.post('/register', userController.registerUser);

// Login
router.post('/login', userController.loginUser);

// User Profile (protected)
router.get('/profile', authMiddleware, userController.getUserProfile);

module.exports = router;
