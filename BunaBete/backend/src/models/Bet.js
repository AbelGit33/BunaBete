const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
  betId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  type: { type: String, enum: ['single', 'accumulator', 'system'], default: 'single' },
  selections: [{
    market: String,
    selection: String,
    odds: Number,
    status: { type: String, enum: ['pending', 'won', 'lost'], default: 'pending' }
  }],
  stake: { type: Number, required: true, min: 10 },
  totalOdds: { type: Number, required: true },
  potentialWin: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'won', 'lost', 'cancelled', 'refunded'], default: 'pending' },
  result: { type: String },
  settledAt: { type: Date },
  ipAddress: { type: String },
  deviceInfo: { type: String },
  isLive: { type: Boolean, default: false }
}, { timestamps: true });

betSchema.index({ user: 1, status: 1, createdAt: -1 });
betSchema.index({ game: 1, status: 1 });

betSchema.pre('save', function(next) {
  if (!this.betId) {
    this.betId = 'BET-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }
  next();
});

module.exports = mongoose.model('Bet', betSchema);
