const express = require('express');
const router = express.Router();
const Album = require('../models/Album');

// 1. GET : Récupérer un album par son ID
router.get('/:id', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) return res.status(404).json({ message: "Album introuvable" });
        res.json(album);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. POST : Créer un album pour un événement [cite: 60]
router.post('/', async (req, res) => {
    try {
        const album = new Album(req.body);
        await album.save();
        res.status(201).json(album);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 3. POST : Ajouter une photo dans l'album [cite: 61]
router.post('/:id/photos', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) return res.status(404).json({ message: "Album introuvable" });

        // On ajoute la photo (URL + ID de l'utilisateur qui poste)
        album.photos.push({
            url: req.body.url,
            posted_by: req.body.userId, // Important : qui a posté la photo ?
            date: new Date()
        });
        
        await album.save();
        res.status(201).json(album);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- LA ROUTE MANQUANTE (Bonus/Spec) ---

// 4. POST : Commenter une photo spécifique 
// URL : /albums/:id/photos/:photoId/comments
router.post('/:id/photos/:photoId/comments', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) return res.status(404).json({ message: "Album introuvable" });

        // On cherche la photo spécifique dans l'album grâce à son ID
        const photo = album.photos.id(req.params.photoId);
        
        if (!photo) {
            return res.status(404).json({ message: "Photo introuvable dans cet album" });
        }

        // On ajoute le commentaire
        photo.comments.push({
            user_id: req.body.userId,
            content: req.body.content,
            date: new Date()
        });

        await album.save();
        res.json({ message: "Commentaire ajouté", photo });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;