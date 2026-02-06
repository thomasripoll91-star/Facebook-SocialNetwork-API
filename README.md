# 📱 My Social Network API - Facebook Project

Ce projet consiste en la création d'une **API REST** robuste simulant les fonctionnalités clés d'un réseau social type Facebook. Elle permet de gérer des événements, des groupes, des discussions complexes et intègre un système de billetterie native.

---

## 🚀 Fonctionnalités Principales

L'API répond à des spécifications fonctionnelles précises pour offrir une expérience utilisateur complète :

* **Gestion des Utilisateurs** : Inscription sécurisée avec contrainte d'unicité sur l'adresse email.
* **Événements** : Gestion complète (nom, description, dates, lieu) avec gestion fine de la visibilité (public/privé).
* **Groupes** : Création de communautés (secrets, privés ou publics) avec système de permissions de publication.
* **Fils de Discussion** : Messagerie contextuelle (un fil est lié de manière exclusive à un groupe **ou** à un événement).
* **Sondages** : Création de sondages multi-questions (une seule réponse par participant).
* **Billetterie** : Vente de billets à prix et quantité limités pour les événements publics.
* **Albums Photos** : Partage de médias et espace de commentaires interactif.

---

## 🛠️ Stack Technique

* **Runtime** : Node.js
* **Framework** : Express.js
* **Base de données** : MongoDB via Mongoose (ODM)
* **Configuration** : Dotenv (Variables d'environnement)

---

## ⚙️ Installation et Configuration

### 1. Installation des dépendances
Clonez le dépôt puis installez les modules nécessaires :

```bash
git clone <url-du-repo>
cd my-social-network-api
npm install
```

### 2. Configuration de l'environnement
Créez un fichier `.env` à la racine du projet et configurez vos accès :

```env
PORT=3000
MONGO_URI=urlmongo/my_social_network
```


### 3. Lancement du serveur

Pour démarrer l'API :

```bash
# Mode production
npm start

# Mode développement
npm run dev
```