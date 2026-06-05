const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  league: { type: String, required: true },
  country: { type: String },
  logo: { type: String },
  founded: { type: Number },
  stadium: { type: String },
  description: { type: String },
  players: [{ type: String }],
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  draws: { type: Number, default: 0 }
}, { timestamps: true });

teamSchema.index({ league: 1, name: 1 });

module.exports = mongoose.model('Team', teamSchema);
