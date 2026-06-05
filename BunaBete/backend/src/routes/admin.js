const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

router.get('/dashboard', authenticate, authorize('admin'), adminController.getDashboardStats);
router.get('/users', authenticate, authorize('admin', 'moderator'), adminController.getUsers);
router.put('/users/:id/status', authenticate, authorize('admin'), adminController.updateUserStatus);
router.get('/bets', authenticate, authorize('admin', 'moderator'), adminController.getBets);
router.put('/bets/:id/settle', authenticate, authorize('admin'), adminController.settleBet);
router.get('/games', authenticate, authorize('admin', 'moderator'), adminController.getGames);
router.post('/games', authenticate, authorize('admin'), adminController.createGame);
router.put('/games/:id', authenticate, authorize('admin'), adminController.updateGame);
router.delete('/games/:id', authenticate, authorize('admin'), adminController.deleteGame);
router.get('/transactions', authenticate, authorize('admin'), adminController.getTransactions);
router.get('/reports/revenue', authenticate, authorize('admin'), adminController.getRevenueReport);
router.get('/reports/users', authenticate, authorize('admin'), adminController.getUserReport);

module.exports = router;
