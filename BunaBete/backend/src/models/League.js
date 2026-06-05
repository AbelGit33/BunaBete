const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  sport: { type: String, enum: ['football', 'basketball', 'tennis', 'athletics', 'other'], required: true },
  country: { type: String },
  logo: { type: String },
  season: { type: String },
  description: { type: String },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

leagueSchema.index({ sport: 1, country: 1 });

module.exports = mongoose.model('League', leagueSchema);
