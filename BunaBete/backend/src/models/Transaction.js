const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['deposit', 'withdrawal', 'bet', 'win', 'loss', 'refund', 'bonus'], required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'ETB' },
  status: { type: String, enum: ['pending', 'completed', 'failed', 'cancelled'], default: 'pending' },
  method: { type: String, enum: ['bank', 'card', 'mobile_money', 'crypto', 'wallet'], required: true },
  reference: { type: String },
  description: { type: String },
  balanceBefore: { type: Number },
  balanceAfter: { type: Number },
  metadata: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

transactionSchema.index({ user: 1, createdAt: -1 });
transactionSchema.index({ status: 1, type: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);
