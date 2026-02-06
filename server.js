const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(express.json()); // Pour lire le JSON

// Connexion base de données
connectDB();

// Définition des routes (Endpoints)
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/groups', require('./routes/groupRoutes'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));