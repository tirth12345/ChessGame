const mongoose = require('mongoose');

const moveSchema = new mongoose.Schema({
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  moveNumber: {
    type: Number,
    required: true,
  },
  from: {
    type: String,
    required: true,
    match: /^[a-h][1-8]$/, // e.g., "e2"
  },
  to: {
    type: String,
    required: true,
    match: /^[a-h][1-8]$/, // e.g., "e4"
  },
  san: {
    type: String, // Standard Algebraic Notation
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isCaptured: {
    type: Boolean,
    default: false,
  },
  isCheck: {
    type: Boolean,
    default: false,
  },
  isCheckmate: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Move', moveSchema);
