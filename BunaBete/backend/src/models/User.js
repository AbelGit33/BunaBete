const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/env');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 30 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  fullName: { type: String, trim: true },
  phone: { type: String, trim: true },
  balance: { type: Number, default: 0, min: 0 },
  bunaStars: { type: Number, default: 0 },
  bunaStarLevel: { type: String, enum: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'], default: 'Bronze' },
  role: { type: String, enum: ['user', 'admin', 'moderator'], default: 'user' },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  referralCode: { type: String, unique: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lastLogin: { type: Date },
  dateOfBirth: { type: Date },
  address: { type: String },
  preferences: {
    currency: { type: String, default: 'ETB' },
    language: { type: String, default: 'en' },
    notifications: { type: Boolean, default: true }
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, config.BCRYPT_SALT_ROUNDS);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { userId: this._id, username: this.username, role: this.role },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN }
  );
};

userSchema.methods.updateBunaStarLevel = function() {
  const stars = this.bunaStars;
  if (stars >= 10000) this.bunaStarLevel = 'Diamond';
  else if (stars >= 5000) this.bunaStarLevel = 'Platinum';
  else if (stars >= 2000) this.bunaStarLevel = 'Gold';
  else if (stars >= 500) this.bunaStarLevel = 'Silver';
  else this.bunaStarLevel = 'Bronze';
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
