const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Création d'un événement (Étapes du cahier des charges)
router.post('/', async (req, res) => {
    try {
        const { name, description, start_date, end_date, location, is_private } = req.body;
        const newEvent = new Event({ name, description, start_date, end_date, location, is_private });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;