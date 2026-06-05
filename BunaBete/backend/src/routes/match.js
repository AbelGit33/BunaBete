const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.get('/', matchController.getMatches);
router.get('/live', matchController.getLiveMatches);
router.get('/upcoming', matchController.getUpcomingMatches);
router.get('/league/:league', matchController.getMatchesByLeague);
router.get('/:id', matchController.getMatchById);
router.post('/', matchController.createMatch);
router.put('/:id', matchController.updateMatch);
router.put('/:id/score', matchController.updateScore);

module.exports = router;
