const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  gameState: {
    type: String, // FEN string representing current board position
    required: true,
  },
  moves: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Move',
  }],
  result: {
    type: String,
    enum: ['win', 'loss', 'draw', 'ongoing'],
    default: 'ongoing',
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: Date,
  timeControl: {
    total: { type: Number, required: true }, // in seconds
    increment: { type: Number, required: true }, // increment per move, in seconds
  },
  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament',
  },
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);
