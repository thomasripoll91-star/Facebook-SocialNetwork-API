const express = require('express');
const router = express.Router();
const groupController = require('../Controllers/groupController');

// Routes obligatoires pour les groupes
router.post('/', groupController.createGroup); // Créer un groupe
router.get('/', groupController.getAllGroups); // Lister les groupes

module.exports = router;