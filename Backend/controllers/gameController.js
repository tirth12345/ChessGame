const gameService = require('../services/gameService');

/**
 * @desc    Get game details by ID
 * @route   GET /api/games/:id
 * @access  Protected
 */
async function getGameById(req, res, next) {
  try {
    const game = await gameService.getGameById(req.params.id);
    if (!game) {
      const error = new Error('Game not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ success: true, data: game });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getGameById,
};
