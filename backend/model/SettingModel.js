const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

module.exports = mongoose.model('Setting', settingSchema);
