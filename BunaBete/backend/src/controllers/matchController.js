const Match = require('../models/Match');

exports.getMatches = async (req, res) => {
  try {
    const { status, league, sport } = req.query;
    const query = {};
    if (status) query.status = status;
    if (league) query.league = league;
    if (sport) query.sport = sport;

    const matches = await Match.find(query).sort('startTime');
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getLiveMatches = async (req, res) => {
  try {
    const matches = await Match.find({ status: 'live' }).sort('startTime');
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUpcomingMatches = async (req, res) => {
  try {
    const matches = await Match.find({
      status: 'upcoming',
      startTime: { $gt: new Date() }
    }).sort('startTime').limit(50);
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMatchesByLeague = async (req, res) => {
  try {
    const matches = await Match.find({ league: req.params.league })
      .sort('startTime');
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createMatch = async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateScore = async (req, res) => {
  try {
    const { homeScore, awayScore, status } = req.body;
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      {
        'score.home': homeScore,
        'score.away': awayScore,
        status: status || 'live'
      },
      { new: true }
    );
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
