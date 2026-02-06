const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // Informations de compte
    firstname: { 
        type: String, 
        required: true 
    },
    lastname: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true // Contrainte : pas deux utilisateurs avec le même email
    },
    password: { 
        type: String, 
        required: true 
    },

    // Informations complémentaires pour la billetterie
    address: {
        street: String,
        city: String,
        zipCode: String,
        country: String
    },

    // Dates de suivi
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('User', UserSchema);