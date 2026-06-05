const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { fullName, phone, address, preferences } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { fullName, phone, address, preferences },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.userId).select('+password');

    if (!await user.comparePassword(currentPassword)) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('balance bunaStars bunaStarLevel');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deposit = async (req, res) => {
  try {
    const { amount, method } = req.body;
    const user = await User.findById(req.user.userId);

    user.balance += amount;
    await user.save();

    await Transaction.create({
      transactionId: 'TXN-' + Date.now(),
      user: user._id,
      type: 'deposit',
      amount,
      method,
      status: 'completed',
      balanceBefore: user.balance - amount,
      balanceAfter: user.balance
    });

    res.json({ message: 'Deposit successful', balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const { amount, method } = req.body;
    const user = await User.findById(req.user.userId);

    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    user.balance -= amount;
    await user.save();

    await Transaction.create({
      transactionId: 'TXN-' + Date.now(),
      user: user._id,
      type: 'withdrawal',
      amount,
      method,
      status: 'pending',
      balanceBefore: user.balance + amount,
      balanceAfter: user.balance
    });

    res.json({ message: 'Withdrawal request submitted', balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.userId })
      .sort('-createdAt')
      .limit(50);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getBets = async (req, res) => {
  const Bet = require('../models/Bet');
  try {
    const bets = await Bet.find({ user: req.user.userId })
      .populate('game')
      .sort('-createdAt')
      .limit(50);
    res.json(bets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getBunaStars = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('bunaStars bunaStarLevel');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getReferrals = async (req, res) => {
  try {
    const referrals = await User.find({ referredBy: req.user.userId }).select('username createdAt');
    res.json(referrals);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.claimBonus = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.balance += 100;
    user.bunaStars += 10;
    await user.save();

    res.json({ message: 'Bonus claimed!', balance: user.balance, bunaStars: user.bunaStars });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
