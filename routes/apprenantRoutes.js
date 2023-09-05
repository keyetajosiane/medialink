const express = require('express');
// Création d'un objet router
const router = express.Router();
// Importation du module userController
const apprenantControllers = require('../controllers/apprenantControllers');

// Définition des routes et des actions du contrôleur
router.get('/apprenant/count', apprenantControllers.count);
router.get('/apprenant', apprenantControllers.getAll); // Affiche la liste des apprenants
router.get('/apprenant/:apprenant_id', apprenantControllers.getapprenantById ); // Affiche les détails d'un apprenant grace a son id
router.get('/apprenant/:matricule', apprenantControllers.getApprenantByMatricule); // Affiche les détails d'un apprenant grace matricule
router.post('/apprenant/insert/', apprenantControllers.insert); // Enregistre un nouvel apprenant dans la base de données
router.put('/apprenant/:apprenant_id', apprenantControllers.updateApprenant); // Met à jour un apprenant dans la base de données
router.delete('/apprenant/:apprenant_id', apprenantControllers.delete); // Supprime un apprenant de la base de données
router.delete('/apprenant/:matricule', apprenantControllers.deleteByMatricule); // Supprime un apprenant de la base de données par son matricule
// Exportation du module router
module.exports = router;

 