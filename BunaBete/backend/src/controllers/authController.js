const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/env');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, email, password, fullName, phone, referralCode } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ username, email, password, fullName, phone });

    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        user.referredBy = referrer._id;
        user.bunaStars = 50;
      }
    }

    user.referralCode = 'REF' + Date.now().toString(36).toUpperCase();
    await user.save();

    const token = user.generateAuthToken();

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        balance: user.balance,
        bunaStars: user.bunaStars,
        bunaStarLevel: user.bunaStarLevel,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !await user.comparePassword(password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isActive) return res.status(403).json({ message: 'Account deactivated' });

    user.lastLogin = new Date();
    await user.save();

    const token = user.generateAuthToken();

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        balance: user.balance,
        bunaStars: user.bunaStars,
        bunaStarLevel: user.bunaStarLevel,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.logout = (req, res) => {
  res.json({ message: 'Logout successful' });
};

exports.refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newToken = user.generateAuthToken();
    res.json({ token: newToken });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.forgotPassword = async (req, res) => {
  res.json({ message: 'Password reset email sent (mock)' });
};

exports.resetPassword = async (req, res) => {
  res.json({ message: 'Password reset successful (mock)' });
};

exports.verifyEmail = async (req, res) => {
  res.json({ message: 'Email verified successfully (mock)' });
};
