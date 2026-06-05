require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/buna-sports',
  JWT_SECRET: process.env.JWT_SECRET || 'buna-sports-super-secret-jwt-key-2026',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12,
  NODE_ENV: process.env.NODE_ENV || 'development',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  ADMIN_URL: process.env.ADMIN_URL || 'http://localhost:3001',
  SITE_NAME: 'Buna Sports',
  SITE_TAGLINE: 'Your Premier Sports News & Information Platform'
};
