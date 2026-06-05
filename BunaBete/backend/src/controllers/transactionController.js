const Transaction = require('../models/Transaction');
const User = require('../models/User');

exports.getMyTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.userId })
      .sort('-createdAt')
      .limit(50);
    res.json(transactions);
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

    const transaction = await Transaction.create({
      transactionId: 'DEP-' + Date.now(),
      user: user._id,
      type: 'deposit',
      amount,
      method,
      status: 'completed',
      balanceBefore: user.balance - amount,
      balanceAfter: user.balance
    });

    res.json({ message: 'Deposit successful', transaction, balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const { amount, method } = req.body;
    const user = await User.findById(req.user.userId);

    if (user.balance < amount) return res.status(400).json({ message: 'Insufficient balance' });

    user.balance -= amount;
    await user.save();

    const transaction = await Transaction.create({
      transactionId: 'WDL-' + Date.now(),
      user: user._id,
      type: 'withdrawal',
      amount,
      method,
      status: 'pending',
      balanceBefore: user.balance + amount,
      balanceAfter: user.balance
    });

    res.json({ message: 'Withdrawal request submitted', transaction, balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('user', 'username email').sort('-createdAt').limit(100);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.approveTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { status: 'completed' },
      { new: true }
    );
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.rejectTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { status: 'failed' },
      { new: true }
    );
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
