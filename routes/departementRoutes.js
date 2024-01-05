const express = require('express');

const router = express.Router();// Création d'un objet router
// Importation du module userController
const departementControllers = require('../controllers/departementController.js');
const authMiddleware = require('../middlewares/authMiddleware');// pour le medleware
const permissionMiddleware = require('../middlewares/permissionMiddleware');// pour les permissions concernant le user




// Définition des routes et des actions du contrôleur
router.get('/departement', departementControllers.count);
// router.get('/departement/get',authMiddleware.authenticateToken, permissionMiddleware.departementGetPermission, departementControllers.getAll); // Affiche la liste des utilisateurs
router.get('/departement/get', departementControllers.getAll); // Affiche la liste des utilisateurs
router.get('/departement/:departement_id', authMiddleware.authenticateToken, permissionMiddleware.departementGetPermission,departementControllers.getdepartementById); // Affiche les détails d'un utilisateur
router.post('/departement/insert', authMiddleware.authenticateToken, permissionMiddleware.departementCreatePermission,departementControllers.insert); // Enregistre un nouvel utilisateur dans la base de données
router.put('/departement/:departement_id', authMiddleware.authenticateToken, permissionMiddleware.departementUpdatePermission,departementControllers.update); // Met à jour un utilisateur dans la base de données
router.delete('/departement/:departement_id',authMiddleware.authenticateToken, permissionMiddleware.departementDeletePermission, departementControllers.deleteById); // Supprime un utilisateur de la base de données

// Exportation du module router
module.exports = router;

