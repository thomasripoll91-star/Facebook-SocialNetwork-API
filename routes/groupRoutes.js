const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const auth = require('../middleware/auth');

// 1. GET : Récupérer tous les groupes
router.get('/', async (req, res) => {
    try {
        const groups = await Group.find();
        res.json(groups);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. GET : Récupérer un groupe par son ID
router.get('/:id', async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) return res.status(404).json({ message: "Groupe introuvable" });
        res.json(group);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. POST : Créer un groupe
router.post('/',auth, async (req, res) => {
    try {
        const newGroup = new Group(req.body);
        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 4. POST : Ajouter un membre au groupe
router.post('/:id/members', async (req, res) => {
    try {
        // $addToSet évite les doublons (on ne peut pas rejoindre 2 fois)
        const group = await Group.findByIdAndUpdate(
            req.params.id, 
            { $addToSet: { members: req.body.userId } }, 
            { new: true }
        );
        res.json(group);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id/members/:userId', async (req, res) => {
    try {
        // $pull est l'inverse de $addToSet : il retire l'ID du tableau members
        const group = await Group.findByIdAndUpdate(
            req.params.id,
            { $pull: { members: req.params.userId } },
            { new: true }
        );

        if (!group) return res.status(404).json({ message: "Groupe introuvable" });

        res.json(group);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 5. PUT : Modifier un groupe
router.put('/:id', async (req, res) => {
    try {
        const updatedGroup = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGroup) return res.status(404).json({ message: "Groupe introuvable" });
        res.json(updatedGroup);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 6. DELETE : Supprimer un groupe
router.delete('/:id', async (req, res) => {
    try {
        const deletedGroup = await Group.findByIdAndDelete(req.params.id);
        if (!deletedGroup) return res.status(404).json({ message: "Groupe introuvable" });
        res.json({ message: "Groupe supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;