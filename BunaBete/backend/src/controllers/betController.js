const Bet = require('../models/Bet');
const Game = require('../models/Game');
const User = require('../models/User');

exports.placeBet = async (req, res) => {
  try {
    const { gameId, selections, stake, type = 'single' } = req.body;
    const userId = req.user.userId;

    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    if (game.status === 'finished') return res.status(400).json({ message: 'Game already finished' });

    const user = await User.findById(userId);
    if (user.balance < stake) return res.status(400).json({ message: 'Insufficient balance' });

    const totalOdds = selections.reduce((acc, sel) => acc * sel.odds, 1);
    const potentialWin = stake * totalOdds;

    const bet = new Bet({
      user: userId,
      game: gameId,
      type,
      selections,
      stake,
      totalOdds,
      potentialWin,
      isLive: game.status === 'live'
    });

    user.balance -= stake;
    user.bunaStars += Math.floor(stake / 10);
    await user.updateBunaStarLevel();
    await user.save();
    await bet.save();

    game.totalBets += 1;
    game.totalAmount += stake;
    await game.save();

    res.status(201).json({ message: 'Bet placed successfully', bet, balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyBets = async (req, res) => {
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

exports.getBetById = async (req, res) => {
  try {
    const bet = await Bet.findById(req.params.id).populate('game');
    if (!bet) return res.status(404).json({ message: 'Bet not found' });
    res.json(bet);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.cashout = async (req, res) => {
  try {
    const bet = await Bet.findById(req.params.id);
    if (!bet || bet.user.toString() !== req.user.userId) {
      return res.status(404).json({ message: 'Bet not found' });
    }
    if (bet.status !== 'pending') return res.status(400).json({ message: 'Bet cannot be cashed out' });

    const cashoutAmount = bet.stake * 0.7;
    const user = await User.findById(req.user.userId);
    user.balance += cashoutAmount;
    await user.save();

    bet.status = 'cancelled';
    await bet.save();

    res.json({ message: 'Cashout successful', cashoutAmount, balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getBetHistory = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = { user: req.user.userId };
    if (status) query.status = status;

    const bets = await Bet.find(query)
      .populate('game')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.json(bets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getBetStats = async (req, res) => {
  try {
    const stats = await Bet.aggregate([
      { $match: { user: mongoose.Types.ObjectId(req.user.userId) } },
      { $group: { _id: '$status', count: { $sum: 1 }, totalStake: { $sum: '$stake' } } }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
