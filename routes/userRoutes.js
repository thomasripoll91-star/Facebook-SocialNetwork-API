const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// INSCRIPTION (Avec hashage du mot de passe)
router.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        // Vérifier si l'email existe déjà
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Email déjà utilisé" });

        // HASHAGE : On crypte le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ 
            firstname, 
            lastname, 
            email, 
            password: hashedPassword // On enregistre le mot de passe crypté
        });

        await newUser.save();
        res.status(201).json({ message: "Utilisateur créé !" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LOGIN (C'est ici qu'on crée le TOKEN)
router.post('/login', async (req, res) => {
    try {
        // 1. On cherche l'utilisateur
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({ message: "Utilisateur ou mot de passe incorrect" });

        // 2. On compare le mot de passe envoyé avec le hash en BDD
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) return res.status(401).json({ message: "Utilisateur ou mot de passe incorrect" });

        // 3. On génère le TOKEN
        res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET', // Clé secrète (à cacher en prod normalement)
                { expiresIn: '24h' }
            )
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;