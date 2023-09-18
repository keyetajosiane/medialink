const express = require('express');
const router = express.Router();// Création d'un objet router


const apprenantControllers = require('../controllers/apprenantControllers');// Importation du module userController
const  departementController= require('../controllers/departementController');
const authMiddleware = require('../middlewares/authMiddleware');// pour le medleware
const permissionMiddleware = require('../middlewares/permissionMiddleware');// pour les permissions concernant le user




// Définition des routes et des actions du contrôleur
router.get('/apprenant/count', apprenantControllers.count);
router.get('/apprenant',authMiddleware.authenticateToken, permissionMiddleware.userGetPermission, apprenantControllers.getAll); // Affiche la liste des apprenants
router.get('/apprenant/:apprenant_id',authMiddleware.authenticateToken, permissionMiddleware.userGetPermission, apprenantControllers.getapprenantById ); // Affiche les détails d'un apprenant grace a son id
router.post('/apprenant/insert/',authMiddleware.authenticateToken, permissionMiddleware.userCreatePermission, apprenantControllers.insert); // Enregistre un nouvel apprenant dans la base de données
router.put('/apprenant/:apprenant_id',authMiddleware.authenticateToken, permissionMiddleware.userUpdatePermission, apprenantControllers.updateApprenant); // Met à jour un apprenant dans la base de données
router.put('/apprenant/departement/:apprenant_id', departementController.update); 
router.delete('/apprenant/:apprenant_id', apprenantControllers.delete); // Supprime un apprenant de la base de données
router.delete('/apprenant/:matricule',authMiddleware.authenticateToken, permissionMiddleware.userDeletePermission, apprenantControllers.deleteByMatricule); // Supprime un apprenant de la base de données par son matricule
// Exportation du module router
module.exports = router;

 