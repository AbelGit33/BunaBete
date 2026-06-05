const SocialPool = require('../models/SocialPool');
const Game = require('../models/Game');
const User = require('../models/User');

exports.getPools = async (req, res) => {
  try {
    const pools = await SocialPool.find({ status: 'open' })
      .populate('creator', 'username')
      .populate('game')
      .sort('-createdAt');
    res.json(pools);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPoolById = async (req, res) => {
  try {
    const pool = await SocialPool.findById(req.params.id)
      .populate('creator', 'username')
      .populate('game')
      .populate('participants.user', 'username');
    if (!pool) return res.status(404).json({ message: 'Pool not found' });
    res.json(pool);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createPool = async (req, res) => {
  try {
    const { name, gameId, prediction, stake, maxParticipants, expiresAt } = req.body;
    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ message: 'Game not found' });

    const pool = new SocialPool({
      name,
      game: gameId,
      creator: req.user.userId,
      maxParticipants: maxParticipants || 100,
      expiresAt: expiresAt || new Date(Date.now() + 24 * 60 * 60 * 1000),
      participants: [{ user: req.user.userId, prediction, stake }]
    });

    pool.totalPool = stake;
    await pool.save();

    res.status(201).json(pool);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.joinPool = async (req, res) => {
  try {
    const { prediction, stake } = req.body;
    const pool = await SocialPool.findById(req.params.id);

    if (!pool) return res.status(404).json({ message: 'Pool not found' });
    if (pool.status !== 'open') return res.status(400).json({ message: 'Pool is closed' });
    if (pool.participants.length >= pool.maxParticipants) {
      return res.status(400).json({ message: 'Pool is full' });
    }

    pool.participants.push({ user: req.user.userId, prediction, stake });
    pool.totalPool += stake;
    await pool.save();

    res.json({ message: 'Joined pool successfully', pool });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.settlePool = async (req, res) => {
  try {
    const { winningPrediction } = req.body;
    const pool = await SocialPool.findById(req.params.id);

    if (!pool) return res.status(404).json({ message: 'Pool not found' });

    pool.status = 'settled';
    pool.winningPrediction = winningPrediction;
    await pool.save();

    res.json({ message: 'Pool settled successfully', pool });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyPools = async (req, res) => {
  try {
    const pools = await SocialPool.find({
      $or: [{ creator: req.user.userId }, { 'participants.user': req.user.userId }]
    }).sort('-createdAt');
    res.json(pools);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.cancelPool = async (req, res) => {
  try {
    const pool = await SocialPool.findById(req.params.id);
    if (!pool) return res.status(404).json({ message: 'Pool not found' });
    if (pool.creator.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    pool.status = 'locked';
    await pool.save();
    res.json({ message: 'Pool cancelled' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
