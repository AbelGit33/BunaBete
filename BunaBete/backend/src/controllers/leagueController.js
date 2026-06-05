const League = require('../models/League');

exports.getLeagues = async (req, res) => {
  try {
    const { sport, country } = req.query;
    const query = {};
    if (sport) query.sport = sport;
    if (country) query.country = country;

    const leagues = await League.find(query).sort('name');
    res.json(leagues);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getLeagueById = async (req, res) => {
  try {
    const league = await League.findById(req.params.id).populate('teams');
    if (!league) return res.status(404).json({ message: 'League not found' });
    res.json(league);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getLeaguesBySport = async (req, res) => {
  try {
    const leagues = await League.find({ sport: req.params.sport }).sort('name');
    res.json(leagues);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createLeague = async (req, res) => {
  try {
    const league = new League(req.body);
    await league.save();
    res.status(201).json(league);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateLeague = async (req, res) => {
  try {
    const league = await League.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!league) return res.status(404).json({ message: 'League not found' });
    res.json(league);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteLeague = async (req, res) => {
  try {
    await League.findByIdAndDelete(req.params.id);
    res.json({ message: 'League deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
