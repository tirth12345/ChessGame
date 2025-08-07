const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const { protect } = require('../middlewares/authMiddleware');

/**
 * Game Management Routes
 */

// Get game details by ID (protected route)
router.get('/:id', protect, gameController.getGameById);

module.exports = router;
