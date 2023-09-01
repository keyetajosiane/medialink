const express = require('express');
// Création d'un objet router
const router = express.Router();
// Importation du module userController
const ressourceControllers= require('../controllers/ressourceControllers');

// Définition des routes et des actions du contrôleur
router.get('/ressource/', ressourceControllers.count); 
router.get('/ressource/get', ressourceControllers.getAll); // Affiche la liste des utilisateurs
router.get('/ressource/:titlle', ressourceControllers.getRessourceByTitlle ); // Affiche les détails d'une ressource
router.get('/ressource/:ressources_id', ressourceControllers.getRessourceById); // Affiche les détails d'un utilisateur
router.get('/ressource/:description', ressourceControllers.getRessourceByDescription ); 
router.post('/ressource/insert', ressourceControllers.insert); // Enregistre un nouvel utilisateur dans la base de données
router.put('/ressource/:ressources_id', ressourceControllers.updateRessource); // Met à jour un utilisateur dans la base de données
router.put('/ressource/:titlle', ressourceControllers.updateTitlle );
router.put('/ressource/:description', ressourceControllers.updateDescription);
router.delete('/ressource/:ressources_id', ressourceControllers.deleteById ); // Supprime un utilisateur de la base de données
router.delete('/ressource/:titlle', ressourceControllers.deleteByTitlle); // Supprime un utilisateur de la base de données

// Exportation du module router
module.exports = router;

