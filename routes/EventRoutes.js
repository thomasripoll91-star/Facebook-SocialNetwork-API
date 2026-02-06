const express = require('express');
const router = express.Router();
const eventController = require('../Controllers/eventController');

// Route existante
router.post('/', eventController.createEvent);

// --- NOUVELLES ROUTES OBLIGATOIRES ---

// Billetterie
router.post('/tickets/type', eventController.addTicketType); // Définir un billet
router.post('/tickets/buy', eventController.buyTicket);      // Acheter un billet

// Sondages
router.post('/polls', eventController.createPoll);           // Créer un sondage
router.post('/polls/vote', eventController.voteInPoll);      // Voter

module.exports = router;