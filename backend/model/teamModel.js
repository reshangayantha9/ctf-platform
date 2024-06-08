const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  solves: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge'
  }],
  usedHints: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge'
  }]
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
