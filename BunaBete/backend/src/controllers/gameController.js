const Game = require('../models/Game');

exports.getGames = async (req, res) => {
  try {
    const { type, status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (type) query.type = type;
    if (status) query.status = status;

    const games = await Game.find(query)
      .sort('-startTime')
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getFeaturedGames = async (req, res) => {
  try {
    const games = await Game.find({ isFeatured: true, status: { $ne: 'finished' } })
      .sort('-startTime')
      .limit(10);
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getGamesByType = async (req, res) => {
  try {
    const games = await Game.find({ type: req.params.type })
      .sort('-startTime')
      .limit(50);
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getLiveGames = async (req, res) => {
  try {
    const games = await Game.find({ status: 'live' }).sort('-startTime');
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
    if (!game) return res.status(404).json({ message: 'Game not found' });
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

exports.settleGame = async (req, res) => {
  try {
    const { result } = req.body;
    const game = await Game.findByIdAndUpdate(
      req.params.id,
      { status: 'finished', result },
      { new: true }
    );
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
