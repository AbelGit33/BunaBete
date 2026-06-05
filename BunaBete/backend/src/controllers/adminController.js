const User = require('../models/User');
const Bet = require('../models/Bet');
const Game = require('../models/Game');
const Transaction = require('../models/Transaction');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const totalBets = await Bet.countDocuments();
    const pendingBets = await Bet.countDocuments({ status: 'pending' });
    const totalTransactions = await Transaction.countDocuments();

    const revenue = await Transaction.aggregate([
      { $match: { type: 'deposit', status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      totalUsers,
      activeUsers,
      totalBets,
      pendingBets,
      totalTransactions,
      revenue: revenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort('-createdAt');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getBets = async (req, res) => {
  try {
    const bets = await Bet.find().populate('user', 'username').populate('game').sort('-createdAt').limit(100);
    res.json(bets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.settleBet = async (req, res) => {
  try {
    const { status } = req.body;
    const bet = await Bet.findByIdAndUpdate(
      req.params.id,
      { status, settledAt: new Date() },
      { new: true }
    );
    res.json(bet);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getGames = async (req, res) => {
  try {
    const games = await Game.find().sort('-createdAt');
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createGame = async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteGame = async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: 'Game deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('user', 'username').sort('-createdAt').limit(100);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getRevenueReport = async (req, res) => {
  try {
    const revenue = await Transaction.aggregate([
      { $group: { _id: '$type', total: { $sum: '$amount' } } }
    ]);
    res.json(revenue);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUserReport = async (req, res) => {
  try {
    const users = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
