const express = require('express');
const router = express.Router(); // Création d'un objet router

// Importation des modules nécessaires
const modulesControllers = require('../controllers/modulesController'); // Adjust path as necessary
const authMiddleware = require('../middlewares/authMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');

// Définition des routes et des actions du contrôleur pour les modules
router.get('/module', authMiddleware.authenticateToken, permissionMiddleware.modulesGetPermission, modulesControllers.getAllModules); // Affiche la liste des modules
router.get('/module/:module_id', authMiddleware.authenticateToken, permissionMiddleware.modulesGetPermission, modulesControllers.getModuleById); // Affiche les détails d'un module
router.post('/module', authMiddleware.authenticateToken, permissionMiddleware.modulesCreatePermission, modulesControllers.createModule); // Enregistre un nouveau module dans la base de données
router.put('/module/:module_id', authMiddleware.authenticateToken, permissionMiddleware.modulesUpdatePermission, modulesControllers.updateModule); // Met à jour un module dans la base de données
router.delete('/module/:module_id', authMiddleware.authenticateToken, permissionMiddleware.modulesDeletePermission, modulesControllers.deleteModule); // Supprime un module de la base de données

// Exportation du module router
module.exports = router;