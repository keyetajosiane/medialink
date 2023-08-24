const express = require('express');
// Création d'un objet router
const router = express.Router();
// Importation du module userController
const formateurControllers = require('../controllers/formateurControllers');

// Définition des routes et des actions du contrôleur
router.get('/formateur', formateurControllers.count); 
router.get('/formateur', formateurControllers.getAll); // Affiche la liste des formateurs
router.get('/formateur/:id', formateurControllers.getformateurById ); // Affiche les détails d'un formateur grace a son id
router.get('/formateur/:matiere_dispensee', formateurControllers.getformateurBymatiere_dispensee); // Affiche les détails d'un formateur grace matricule
router.post('/formateur', formateurControllers.insert); // Enregistre un nouvel apprenant dans la base de données
router.put('/formateur/:id', formateurControllers.updateFormateur); // Met à jour un apprenant dans la base de données
router.put('/formateur/:matiere_dispensee', formateurControllers.updateMatiere_dispensee); // Met à jour un apprenant dans la base de données grace a son matricule
router.delete('/formateur/:id', formateurControllers.delete); // Supprime un apprenant de la base de données
router.delete('/formateur/:id', formateurControllers.deleteById); 

// Exportation du module router
module.exports = router;

 