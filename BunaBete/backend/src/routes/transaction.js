const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const transactionController = require('../controllers/transactionController');

router.get('/my-transactions', authenticate, transactionController.getMyTransactions);
router.post('/deposit', authenticate, transactionController.deposit);
router.post('/withdraw', authenticate, transactionController.withdraw);
router.get('/:id', authenticate, transactionController.getTransactionById);

router.get('/admin/all', authenticate, authorize('admin', 'moderator'), transactionController.getAllTransactions);
router.put('/:id/approve', authenticate, authorize('admin'), transactionController.approveTransaction);
router.put('/:id/reject', authenticate, authorize('admin'), transactionController.rejectTransaction);

module.exports = router;
