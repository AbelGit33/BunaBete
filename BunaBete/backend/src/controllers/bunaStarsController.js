const User = require('../models/User');
const BunaStars = require('../models/BunaStars');

exports.getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('bunaStars bunaStarLevel');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await BunaStars.find({ user: req.user.userId }).sort('-createdAt').limit(50);
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.convertToBalance = async (req, res) => {
  try {
    const { stars } = req.body;
    const user = await User.findById(req.user.userId);

    if (user.bunaStars < stars) return res.status(400).json({ message: 'Insufficient stars' });

    const conversionRate = 0.01;
    const amount = stars * conversionRate;

    user.bunaStars -= stars;
    user.balance += amount;
    await user.save();

    await BunaStars.create({
      user: user._id,
      stars: -stars,
      source: 'conversion',
      description: `Converted ${stars} stars to ${amount} ETB`
    });

    res.json({ message: 'Conversion successful', balance: user.balance, bunaStars: user.bunaStars });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAvailableRewards = async (req, res) => {
  const rewards = [
    { id: 1, name: 'Welcome Bonus', starsRequired: 100, reward: '50 ETB Bonus' },
    { id: 2, name: 'Lucky Spin', starsRequired: 500, reward: 'Free Spin' },
    { id: 3, name: 'VIP Access', starsRequired: 2000, reward: 'VIP Support + 5% Cashback' },
    { id: 4, name: 'Diamond Perks', starsRequired: 10000, reward: 'Exclusive Events + 10% Cashback' }
  ];
  res.json(rewards);
};

exports.claimReward = async (req, res) => {
  res.json({ message: 'Reward claimed successfully (mock)' });
};

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find().sort('-bunaStars').limit(10).select('username bunaStars bunaStarLevel');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
