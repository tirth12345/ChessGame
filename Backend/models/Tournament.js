const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  brackets: {
    type: mongoose.Schema.Types.Mixed, // Flexible structure, could be JSON or custom object
    default: {},
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming',
  },
}, { timestamps: true });

module.exports = mongoose.model('Tournament', tournamentSchema);
