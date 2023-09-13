const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken')
// Création d'un objet router

const router = express.Router();
// Importation du module userController


router.post('signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);


router.post('login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');

              return res.json({ token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);


const userController = require('../controllers/userController');
const userPermissionsController = require('../controllers/userPermissionsController');

// Définition des routes et des actions du contrôleur
router.get('/user', userController.getAll); // Affiche la liste des utilisateurs
router.get('/user/email', userController.getUserByEmail); // Affiche l'utilisateur correspondant à l'email
router.get('/user/count', userController.count); // Compte le nombre d'utilisateurs
router.get('/user/search', userController.getUserByuser_nameOrEmail); // Affiche l'utilisateur correspondant au nom ou à l'email
router.get('/user/:user_id', userController.getUserById); // Affiche les détails d'un utilisateur
router.post('/user/create/', userController.create); // Enregistre un nouvel utilisateur dans la base de données
router.put('/user/permissions/:user_id', userPermissionsController.updateUserPermissions); // Met à jour les permissions d'un utilisateur
router.put('/user/:user_id', userController.update); // Met à jour un utilisateur dans la base de données
router.delete('/user/:user_id', userController.delete); // Supprime un utilisateur de la base de données

// Exportation du module router
module.exports = router;
