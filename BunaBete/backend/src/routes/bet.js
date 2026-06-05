const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const betController = require('../controllers/betController');

router.post('/', authenticate, betController.placeBet);
router.get('/my-bets', authenticate, betController.getMyBets);
router.get('/:id', authenticate, betController.getBetById);
router.post('/:id/cashout', authenticate, betController.cashout);
router.get('/history', authenticate, betController.getBetHistory);
router.get('/stats', authenticate, betController.getBetStats);

module.exports = router;
