const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const socialPoolController = require('../controllers/socialPoolController');

router.get('/', socialPoolController.getPools);
router.get('/:id', socialPoolController.getPoolById);
router.post('/', authenticate, socialPoolController.createPool);
router.post('/:id/join', authenticate, socialPoolController.joinPool);
router.post('/:id/settle', authenticate, socialPoolController.settlePool);
router.get('/my-pools', authenticate, socialPoolController.getMyPools);
router.delete('/:id', authenticate, socialPoolController.cancelPool);

module.exports = router;
