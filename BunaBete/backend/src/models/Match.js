const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  league: { type: String, required: true },
  sport: { type: String, enum: ['football', 'basketball', 'tennis', 'other'], default: 'football' },
  startTime: { type: Date, required: true },
  status: { type: String, enum: ['upcoming', 'live', 'finished', 'postponed'], default: 'upcoming' },
  score: {
    home: { type: Number, default: 0 },
    away: { type: Number, default: 0 }
  },
  venue: { type: String },
  country: { type: String },
  isFeatured: { type: Boolean, default: false },
  events: [{ type: String }]
}, { timestamps: true });

matchSchema.index({ status: 1, startTime: 1 });
matchSchema.index({ league: 1, startTime: 1 });

module.exports = mongoose.model('Match', matchSchema);
