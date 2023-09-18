const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken')
// Création d'un objet router
const router = express.Router();

// Importation du module userController
const userController = require('../controllers/userController');
// importation du module userpermissionControllers
const userPermissionsController = require('../controllers/userPermissionsController');


// Signup route
router.post('/signup', userController.signup);

// Login route
router.post('/login', userController.login);

// Protected route that requires authentication
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});

const userController = require('../controllers/userController');
const userPermissionsController = require('../controllers/userPermissionsController');
const authController = require('../controllers/authController');

// Définition des routes et des actions du contrôleur
router.get('/user', userController.getAll); // Affiche la liste des utilisateurs
router.get('/user/email', userController.getUserByEmail); // Affiche l'utilisateur correspondant à l'email
router.get('/user/count', userController.count); // Compte le nombre d'utilisateurs
router.get('/user/search', userController.getUserByuser_nameOrEmail); // Affiche l'utilisateur correspondant au nom ou à l'email
router.get('/user/:user_id', userController.getUserById); // Affiche les détails d'un utilisateur
router.post('/user/login', authController.login); // Connexion d'un utilisateur
router.post('/user/create/', userController.create); // Enregistre un nouvel utilisateur dans la base de données
router.put('/user/permissions/:user_id', userPermissionsController.updateUserPermissions); // Met à jour les permissions d'un utilisateur
router.put('/user/:user_id', userController.update); // Met à jour un utilisateur dans la base de données
router.delete('/user/:user_id', userController.delete); // Supprime un utilisateur de la base de données

// Exportation du module router
module.exports = router;
