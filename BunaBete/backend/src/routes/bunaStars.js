const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const bunaStarsController = require('../controllers/bunaStarsController');

router.get('/balance', authenticate, bunaStarsController.getBalance);
router.get('/history', authenticate, bunaStarsController.getHistory);
router.post('/convert', authenticate, bunaStarsController.convertToBalance);
router.get('/rewards', authenticate, bunaStarsController.getAvailableRewards);
router.post('/claim-reward', authenticate, bunaStarsController.claimReward);
router.get('/leaderboard', bunaStarsController.getLeaderboard);

module.exports = router;
