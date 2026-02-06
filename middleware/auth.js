const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // 1. On récupère le token dans le header (Format: "Bearer LE_TOKEN")
        const token = req.headers.authorization.split(' ')[1];
        
        // 2. On décode le token (la clé secrète doit être la même que celle utilisée pour créer le token)
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        
        // 3. On ajoute l'ID utilisateur à la requête pour que les routes puissent l'utiliser
        req.auth = {
            userId: decodedToken.userId
        };
        
        next(); // Tout est bon, on passe à la suite !
    } catch(error) {
        res.status(401).json({ error: 'Requête non authentifiée !' });
    }
};