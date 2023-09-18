const express = require('express');
const router = express.Router();// Création d'un objet router

const formateurControllers = require('../controllers/formateurControllers');// Importation du module userController
const departement_formateurControllers= require('../controllers/departement_formateurControllers');
const authMiddleware = require('../middlewares/authMiddleware');// pour le medleware
const permissionMiddleware = require('../middlewares/permissionMiddleware');// pour les permissions concernant le user



// Définition des routes et des actions du contrôleur
router.get('/formateur', formateurControllers.count); 
router.get('/formateur/get', authMiddleware.authenticateToken, permissionMiddleware.userGetPermission,formateurControllers.getAll); // Affiche la liste des formateurs
router.get('/formateur/:formateur_id', authMiddleware.authenticateToken, permissionMiddleware.userGetPermission, formateurControllers.getformateurById ); // Affiche les détails d'un formateur grace a son id
router.post('/formateur/create', authMiddleware.authenticateToken, permissionMiddleware.userCreatePermission, formateurControllers.create);
router.put('/formateur/:formateur_id', authMiddleware.authenticateToken, permissionMiddleware.userUpdatePermission, formateurControllers.updateFormateur); // Met à jour un apprenant dans la base de données
router.put('/formateur/departemnt/:formateur_id', departement_formateurControllers.updateDepartement_formateur); 
router.delete('/formateur/:formateur_id', authMiddleware.authenticateToken, permissionMiddleware.userDeletePermission, formateurControllers.delete); // Supprime un apprenant de la base de données


// Exportation du module router
module.exports = router;

 