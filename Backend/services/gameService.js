const Game = require('../models/game');

async function getGameById(id) {
  return await Game.findById(id);
}

module.exports = {
  getGameById,
};
