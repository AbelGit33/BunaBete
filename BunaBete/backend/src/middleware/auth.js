const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/env');

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user || !user.isActive) return res.status(401).json({ message: 'User not found or inactive' });

    req.user = { userId: user._id, username: user.username, role: user.role };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

exports.optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      if (user && user.isActive) {
        req.user = { userId: user._id, username: user.username, role: user.role };
      }
    }
    next();
  } catch (error) {
    next();
  }
};

exports.authenticateSocket = (socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error('Authentication error'));

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    socket.userId = decoded.userId;
    next();
  } catch (error) {
    next(new Error('Authentication error'));
  }
};
