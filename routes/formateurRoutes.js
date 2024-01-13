const express = require('express');
const router = express.Router();// Création d'un objet router

const formateurControllers = require('../controllers/formateurControllers');// Importation du module userController
const departement_formateurControllers= require('../controllers/departement_formateurControllers');
const formateurModuleController = require('../controllers/formateurModuleController');
const authMiddleware = require('../middlewares/authMiddleware');// pour le medleware
const permissionMiddleware = require('../middlewares/permissionMiddleware');// pour les permissions concernant le user



// Définition des routes et des actions du contrôleur
router.get('/formateur', formateurControllers.count); 
router.get('/formateur/get', authMiddleware.authenticateToken, permissionMiddleware.userGetPermission,formateurControllers.getAll); // Affiche la liste des formateurs
router.get('/formateur-module', authMiddleware.authenticateToken, permissionMiddleware.userGetPermission,formateurModuleController.getAllAssignments);
router.get('/formateur/:user_id/user', authMiddleware.authenticateToken, permissionMiddleware.userGetPermission, formateurControllers.getformateurByUserId );
router.get('/formateur/:formateur_id', authMiddleware.authenticateToken, permissionMiddleware.userGetPermission, formateurControllers.getformateurById ); // Affiche les détails d'un formateur grace a son id
router.get('/formateur-module/:formateur_id/formateur',authMiddleware.authenticateToken, permissionMiddleware.userGetPermission, formateurModuleController.getAssignmentsByFormateur);
router.get('/formateur-module/:formateur_id/module',authMiddleware.authenticateToken, permissionMiddleware.userGetPermission, formateurModuleController.getAssignmentsByModule);


router.post('/formateur/create', authMiddleware.authenticateToken, permissionMiddleware.userCreatePermission, formateurControllers.create);
router.post('/formateur-module/insert', authMiddleware.authenticateToken, permissionMiddleware.userCreatePermission, formateurModuleController.assignFormateurToModule);
router.post('/formateur-module/batch', authMiddleware.authenticateToken, permissionMiddleware.userCreatePermission, formateurModuleController.batchAssignFormateursToModule);


router.put('/formateur/:formateur_id', authMiddleware.authenticateToken, permissionMiddleware.userUpdatePermission, formateurControllers.updateFormateur); // Met à jour un apprenant dans la base de données
router.put('/formateur/departemnt/:formateur_id', departement_formateurControllers.updateDepartement_formateur); 


router.delete('/formateur/:formateur_id', authMiddleware.authenticateToken, permissionMiddleware.userDeletePermission, formateurControllers.delete); // Supprime un apprenant de la base de données
router.delete('/formateur-module/:formateur_id', authMiddleware.authenticateToken, permissionMiddleware.userDeletePermission, formateurModuleController.unassignFormateurFromModule);


// Exportation du module router
module.exports = router;

 