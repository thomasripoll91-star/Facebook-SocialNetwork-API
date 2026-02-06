const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Utilisation de l'URI fournie dans le document 
        const uri = "mongodb+srv://xena_db_user:Z5qWuuJYPJnPHZPv@mysocialnetwork.zjjzpng.mongodb.net/my_social_network?retryWrites=true&w=majority&connectTimeoutMS=10000";
        await mongoose.connect(uri);
        console.log("Connecté à MongoDB avec succès !");
    } catch (err) {
        console.error("Erreur de connexion :", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;