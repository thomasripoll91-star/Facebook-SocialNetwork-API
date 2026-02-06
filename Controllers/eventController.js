const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Logique de billetterie (Bonus/Spécifications)
exports.addTicketType = async (req, res) => {
    // Un organisateur définit un type de billet 
    // Doit contenir : nom, montant, quantité 
};