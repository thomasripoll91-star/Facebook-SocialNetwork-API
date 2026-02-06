const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        // Va chercher tous les utilisateurs dans MongoDB
        const users = await User.find(); 
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

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

router.put('/:id', async (req, res) => {
    try {
        // { new: true } permet de renvoyer l'utilisateur une fois modifié, pas l'ancien
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!updatedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        
        res.json({ message: "Utilisateur mis à jour", user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.json({ message: "Utilisateur supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;