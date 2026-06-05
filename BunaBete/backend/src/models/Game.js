const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  gameId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['sports', 'casino', 'live', 'virtual', 'lottery'], required: true },
  category: { type: String, enum: ['football', 'basketball', 'tennis', 'slots', 'poker', 'roulette', 'other'] },
  status: { type: String, enum: ['upcoming', 'live', 'finished', 'cancelled'], default: 'upcoming' },
  odds: [{
    market: String,
    selection: String,
    value: Number,
    status: { type: String, enum: ['active', 'suspended', 'settled'], default: 'active' }
  }],
  startTime: { type: Date },
  endTime: { type: Date },
  result: { type: String },
  participants: [String],
  league: { type: String },
  country: { type: String },
  isFeatured: { type: Boolean, default: false },
  minBet: { type: Number, default: 10 },
  maxBet: { type: Number, default: 100000 },
  totalBets: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  liveData: {
    score: String,
    time: String,
    status: String
  }
}, { timestamps: true });

gameSchema.index({ type: 1, status: 1, startTime: 1 });
gameSchema.index({ isFeatured: 1, status: 1 });

module.exports = mongoose.model('Game', gameSchema);
