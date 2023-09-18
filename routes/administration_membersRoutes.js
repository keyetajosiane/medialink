const express = require('express');

const router = express.Router();// Création d'un objet router
// Importation du module userController
const administration_membersControllers = require('../controllers/administration_membersControllers');
const authMiddleware = require('../middlewares/authMiddleware');// pour le medleware
const permissionMiddleware = require('../middlewares/permissionMiddleware');// pour les permissions concernant le user


// Définition des routes et des actions du contrôleur
router.get('/administration_members/count',administration_membersControllers.count);
router.get('/administration_members/getall', authMiddleware.authenticateToken, permissionMiddleware.userGetPermission, administration_membersControllers.getAll); // Affiche la liste des formateurs
router.get('/administration_members/:id', authMiddleware.authenticateToken, permissionMiddleware.userGetPermission,administration_membersControllers.getadministration_membersById); // Affiche les détails d'un formateur grace a son id
router.post('/administration_members/insert',authMiddleware.authenticateToken, permissionMiddleware.userCreatePermission, administration_membersControllers.insert); // Enregistre un nouvel apprenant dans la base de données
router.put('/administration_members/:id', authMiddleware.authenticateToken, permissionMiddleware.userUpdatePermission, administration_membersControllers.updateAdministration_members); // Met à jour un apprenant dans la base de données
router.delete('/administration_members/:id',authMiddleware.authenticateToken, permissionMiddleware.userDeletePermission, administration_membersControllers.delete); // Supprime un apprenant de la base de données 


// Exportation du module router
module.exports = router;

 