const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { TicketType, TicketPurchase } = require('../models/Ticket');
const Poll = require('../models/Poll');

// --- GESTION DES ÉVÉNEMENTS (CRUD) ---

// 1. GET : Récupérer tous les événements
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. GET : Récupérer un événement par son ID
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Événement introuvable" });
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. POST : Créer un événement
router.post('/', async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 4. PUT : Modifier un événement
router.put('/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) return res.status(404).json({ message: "Événement introuvable" });
        res.json(updatedEvent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 5. DELETE : Supprimer un événement
router.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) return res.status(404).json({ message: "Événement introuvable" });
        res.json({ message: "Événement supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- GESTION DE LA BILLETTERIE ---

// Ajouter un type de billet (ex: VIP)
router.post('/tickets/type', async (req, res) => {
    try {
        const newTicket = new TicketType(req.body);
        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Acheter un billet (Contrôle : 1 billet max par personne)
router.post('/tickets/buy', async (req, res) => {
    try {
        // Vérification si l'utilisateur a déjà acheté ce type de billet
        const alreadyBought = await TicketPurchase.findOne({ 
            lastname: req.body.lastname, 
            firstname: req.body.firstname,
            ticket_type_id: req.body.ticket_type_id 
        });

        if (alreadyBought) {
            return res.status(403).json({ error: "Limite atteinte : Une seule place par personne autorisée." });
        }

        const purchase = new TicketPurchase(req.body);
        await purchase.save();
        res.status(201).json({ message: "Achat confirmé", purchase });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- GESTION DES SONDAGES (POLLS) ---

// Créer un sondage pour un événement
router.post('/polls', async (req, res) => {
    try {
        const poll = new Poll(req.body);
        await poll.save();
        res.status(201).json(poll);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Voter à un sondage
router.post('/polls/vote', async (req, res) => {
    try {
        const { pollId, questionIndex, optionIndex, userId } = req.body;
        const poll = await Poll.findById(pollId);
        
        if (!poll) return res.status(404).json({ message: "Sondage introuvable" });

        // On ajoute le vote dans la bonne case
        poll.questions[questionIndex].responses.push({
            user_id: userId,
            chosen_option_index: optionIndex
        });
        
        await poll.save();
        res.json({ message: "Vote enregistré" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;