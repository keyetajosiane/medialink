const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken')
// Création d'un objet router
const router = express.Router();

// Protected route that requires authentication
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});

const userController = require('../controllers/userController');
const userPermissionsController = require('../controllers/userPermissionsController');
const permissionMiddleware = require('../middlewares/permissionMiddleware');// pour les permissions concernant le user
const authController = require('../controllers/authController');//pour le login
const authMiddleware = require('../middlewares/authMiddleware');// pour le medleware



// Définition des routes et des actions du contrôleur
router.get('/user', authMiddleware.authenticateToken, permissionMiddleware.userGetPermission,userController.getAll); // Affiche la liste des utilisateurs
router.get('/user/count', userController.count); // Compte le nombre d'utilisateurs
router.get('/user/refresh', authMiddleware.authenticateToken, authController.refresh);
router.get('/user/:user_id',authMiddleware.authenticateToken, permissionMiddleware.userGetPermission, userController.getUserById); // Affiche les détails d'un utilisateur
router.post('/user/login', authController.login); // Connexion d'un utilisateur
router.post('/user/create/',authMiddleware.authenticateToken, permissionMiddleware.userCreatePermission, userController.create); // Enregistre un nouvel utilisateur dans la base de données
router.put('/user/permissions/:user_id', userPermissionsController.updateUserPermissions); // Met à jour les permissions d'un utilisateur
router.put('/user/:user_id', authMiddleware.authenticateToken, permissionMiddleware.userUpdatePermission,userController.update); // Met à jour un utilisateur dans la base de données
router.delete('/user/:user_id', authMiddleware.authenticateToken, permissionMiddleware.userDeletePermission , userController.delete); // Supprime un utilisateur de la base de données

// Exportation du module router
module.exports = router;
