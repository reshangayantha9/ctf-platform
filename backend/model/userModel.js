const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your name is required"],
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  role: {
    type: String,
    enum: ['captain', 'admin', 'member'],
    default: 'member',
  },
  score: {
    type: Number,
    default: 0,
  },
  solves: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge'
  }],
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
