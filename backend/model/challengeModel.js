const mongoose = require('mongoose');
const User = require('./userModel');
const Team = require('./teamModel');
const challengeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    enum: ["visible", "disable"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  resource: {
    type: String,
  },
  flag: {
    type: String,
    required: true,
  },
  hints: [{
    title: { type: String },
    cost: { type: Number },
  }]
}, { timestamps: true });

challengeSchema.methods.useHint = async function(user, team, hintIndex) {
  const hint = this.hints[hintIndex];
  if (!team.usedHints.includes(this._id)) {
    team.usedHints.push(this._id);
    team.score = (team.score || 0) - hint.cost;
    user.score = (user.score || 0) - hint.cost; 
    await user.save();
    await team.save();
  }
};
challengeSchema.methods.verifyFlag = function(flag) {
  return this.flag === flag;
};
const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
