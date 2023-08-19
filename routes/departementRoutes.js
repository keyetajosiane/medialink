const express = require('express');
// Création d'un objet router
const router = express.Router();
// Importation du module userController
const departementControllers = require('../controllers/departementController.js');

// Définition des routes et des actions du contrôleur
router.get('/departement', departementControllers.count);
router.get('/departement', departementControllers.getAll); // Affiche la liste des utilisateurs
router.get('/departement/:departement_id', departementControllers.getdepartementById); // Affiche les détails d'un utilisateur
router.get('/departement/:nom_departement', departementControllers.getdepartementByNom); // Affiche les détails d'un utilisateur
router.post('/departement', departementControllers.insert); // Enregistre un nouvel utilisateur dans la base de données
router.put('/departement/:departement_id', departementControllers.update); // Met à jour un utilisateur dans la base de données
router.put('/departement/:nom_departement', departementControllers.updateNomDepartement);
router.delete('/departement/:departement_id', departementControllers.deleteById); // Supprime un utilisateur de la base de données
router.delete('/departement/:nom_departement', departementControllers.deleteByNom); // Supprime un utilisateur de la base de données

// Exportation du module router
module.exports = router;

