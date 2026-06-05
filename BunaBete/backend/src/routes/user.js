const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const userController = require('../controllers/userController');

router.get('/profile', authenticate, userController.getProfile);
router.put('/profile', authenticate, userController.updateProfile);
router.put('/password', authenticate, userController.changePassword);
router.get('/balance', authenticate, userController.getBalance);
router.post('/deposit', authenticate, userController.deposit);
router.post('/withdraw', authenticate, userController.withdraw);
router.get('/transactions', authenticate, userController.getTransactions);
router.get('/bets', authenticate, userController.getBets);
router.get('/buna-stars', authenticate, userController.getBunaStars);
router.get('/referrals', authenticate, userController.getReferrals);
router.post('/claim-bonus', authenticate, userController.claimBonus);

module.exports = router;
