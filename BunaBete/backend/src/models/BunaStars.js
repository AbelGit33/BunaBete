const mongoose = require('mongoose');

const bunaStarsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stars: { type: Number, required: true },
  source: { type: String, enum: ['bet', 'deposit', 'login', 'referral', 'bonus', 'achievement'], required: true },
  description: { type: String },
  multiplier: { type: Number, default: 1 },
  claimedRewards: [{
    reward: String,
    claimedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

bunaStarsSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('BunaStars', bunaStarsSchema);
