const mongoose = require('mongoose');

const socialPoolSchema = new mongoose.Schema({
  poolId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    prediction: String,
    stake: Number,
    joinedAt: { type: Date, default: Date.now }
  }],
  totalPool: { type: Number, default: 0 },
  status: { type: String, enum: ['open', 'locked', 'settled'], default: 'open' },
  winningPrediction: { type: String },
  prizeDistribution: {
    winnerShare: { type: Number, default: 70 },
    creatorBonus: { type: Number, default: 10 },
    platformFee: { type: Number, default: 20 }
  },
  minParticipants: { type: Number, default: 2 },
  maxParticipants: { type: Number, default: 100 },
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

socialPoolSchema.index({ status: 1, expiresAt: 1 });
socialPoolSchema.index({ creator: 1, createdAt: -1 });

module.exports = mongoose.model('SocialPool', socialPoolSchema);
