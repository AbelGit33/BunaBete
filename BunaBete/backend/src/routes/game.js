const express = require('express');
const router = express.Router();
const { authenticate, optionalAuth } = require('../middleware/auth');
const gameController = require('../controllers/gameController');

router.get('/', optionalAuth, gameController.getGames);
router.get('/featured', gameController.getFeaturedGames);
router.get('/:id', optionalAuth, gameController.getGameById);
router.get('/type/:type', gameController.getGamesByType);
router.get('/live/all', gameController.getLiveGames);
router.post('/', authenticate, gameController.createGame);
router.put('/:id', authenticate, gameController.updateGame);
router.delete('/:id', authenticate, gameController.deleteGame);
router.post('/:id/settle', authenticate, gameController.settleGame);

module.exports = router;
