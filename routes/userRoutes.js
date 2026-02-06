const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => res.send("Route active"));

module.exports = router;

// Endpoint pour créer un utilisateur (Inscription)
router.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        
        // Facebook demande un email unique [cite: 47]
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        const newUser = new User({ firstname, lastname, email, password });
        await newUser.save();
        
        res.status(201).json({ message: "Utilisateur créé avec succès !", user: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;