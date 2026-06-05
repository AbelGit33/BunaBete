const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  summary: { type: String },
  category: { type: String, enum: ['football', 'basketball', 'tennis', 'athletics', 'other'], required: true },
  author: { type: String, default: 'Buna Sports Team' },
  imageUrl: { type: String },
  source: { type: String },
  tags: [String],
  isFeatured: { type: Boolean, default: false },
  publishedAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 }
}, { timestamps: true });

articleSchema.index({ category: 1, publishedAt: -1 });
articleSchema.index({ isFeatured: 1, publishedAt: -1 });

module.exports = mongoose.model('Article', articleSchema);
