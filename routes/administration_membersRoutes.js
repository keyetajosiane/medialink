const express = require('express');
// Création d'un objet router
const router = express.Router();
// Importation du module userController
const administration_membersControllers = require('../controllers/administration_membersControllers');

// Définition des routes et des actions du contrôleur
router.get('/administration_members/count',administration_membersControllers.count);
router.get('/administration_members',administration_membersControllers.getAll); // Affiche la liste des formateurs
router.get('/administration_members/:id', administration_membersControllers.getadministration_membersById); // Affiche les détails d'un formateur grace a son id
router.get('/administration_members/:poste', administration_membersControllers.getadministration_membersByPoste); // Affiche les détails d'un formateur grace matricule
router.post('/administration_members/insert', administration_membersControllers.insert); // Enregistre un nouvel apprenant dans la base de données
router.put('/administration_members/:id', administration_membersControllers.updateAdministration_members); // Met à jour un apprenant dans la base de données
router.delete('/administration_members/:id', administration_membersControllers.delete); // Supprime un apprenant de la base de données 


// Exportation du module router
module.exports = router;

 