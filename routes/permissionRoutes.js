const express = require('express');
// Création d'un objet router
const router = express.Router();
// Importation du module userController
const permissionControllers = require('../controllers/permissionControllers');

// Définition des routes et des actions du contrôleur
router.get('/permission/', permissionControllers.count); 
router.get('/permission', permissionControllers.getAll); // Affiche la liste des utilisateurs
router.get('/permission/:permissions_id', permissionControllers.getpermissionById ); // Affiche les détails d'un utilisateur
router.get('/permission/:nom', permissionControllers.getpermissionByNom); // Affiche les détails d'un utilisateur
router.post('/permission', permissionControllers.insert); // Enregistre un nouvel utilisateur dans la base de données
router.put('/permission/:permissions_id', permissionControllers.updatePermission); // Met à jour un utilisateur dans la base de données
router.put('/permission/:nom', permissionControllers.updateNom);
router.delete('/permission/:permissions_id', permissionControllers.delete); // Supprime un utilisateur de la base de données
router.delete('/permission/:nom', permissionControllers.deleteByNom); // Supprime un utilisateur de la base de données

// Exportation du module router
module.exports = router;

