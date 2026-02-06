const express = require('express');
const router = express.Router();

// Route temporaire pour tester le lancement
router.get('/', (req, res) => {
    res.json({ message: "Route des groupes opérationnelle" });
});

module.exports = router;