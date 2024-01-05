const formateur = require('../models/formateurModels');
const departement = require('../models/departementModels');
const departement_formateur = require('../models/departement_formateurModels');
const userController = require('./userController');

exports.getAll = async (req, res) => {
  const formateurs = await formateur.findAll();
  res.json(formateurs);
};

exports.create = async (req, res) => {
  const create_data = req.body;

  // matiere_dispensee should be provided
  if (!create_data.matiere_dispensee) {
    res.status(400).json({ message: "matiere_dispensee is required" });
    return;
  }
  // departements should be provided
  if (!create_data.departements) {
    res.status(400).json({ message: "departements is required" });
    return;
  }

  // first create the user
  userController.create(req, res, async (userCreationResult) => {
    // check if status is 201 or 200
    if (userCreationResult.status !== 201 && userCreationResult.status !== 200) {
      res.status(userCreationResult.status).json({ message: userCreationResult.message });
      return;
    }
    const user = userCreationResult.user;
    create_data['user_id'] = user.user_id;

    // insert the user in the users table
    const formateur_id = await formateur.insert(create_data)
    if (formateur_id === false) {
      res.status(500).json({ message: "Unable to create this formateur due to an internal server error" });
      return;
    }

    // get the permissions from the request body
    const departements = create_data.departements;
    if (departements) {
      // insert the associations between the user and the permissions in the user_permissions table
      for (let departement_id of departements) {
        // get the permission id from the permissions table
        const existing_departement = await departement.findByDepartement_id(departement_id);
        if (existing_departement === null) {
          continue
        }
        // insert the association in the user_permissions table
        const result = await departement_formateur.insert({ formateur_id, departement_id });
        if (result === false) {
          console.log("An internal server error occured when associating the formateur to his departement");
          continue
        }
      }
    }

    // return the new user
    const new_form = await formateur.findById(formateur_id);
    new_form = { ...new_form, ...user };
    new_form.departement = departements; // ajouter le champ departement à l'objet new_form
    return res.status(201).json(new_form);
  });

};















exports.getformateurById = async (req, res) => {
  // Récupération de l'ID de l'apprenant
  const { formateur_id } = req.params;
  // Recherche de l'utilisateur par ID
  const formateurs = await formateur.findById(formateur_id);
  // Envoi de la réponse au format JSON
  res.json(formateurs);
};

exports.getformateurBymatiere_dispensee = async (req, res) => {
  // Récupération de l'ID de la ressource
  const { matiere_dispensee } = req.params;
  // Recherche de l'utilisateur par ID
  const formateurs = await formateur.findBymatiere_dispensee(matiere_dispensee)
  // Envoi de la réponse au format JSON
  res.json(formateurs);
};
exports.updateFormateur = async (req, res) => {
  // Récupération de l'ID du departement
  const { formateur_id } = req.params;
  // Récupération des données du formulaire
  const formateur_update_data = req.body;
  // get the departement from the database
  const formateurs = await formateur.findById(formateur_id)   // if the user does not exist, throw an error
  if (!formateurs) {
    return res.status(404).json({ message: "formateur not found." })
  }
  for (const key of Object.keys(formateur_update_data)) {
    //TODO:: if the key is password, hash the password before saving it
    formateurs[key] = formateur_update_data[key]
  }
  // Mise à jour du departement dans la base de données
  const result = await formateur.updateFormateur(formateur_id, formateurs);
  if (result === null) {
    return res.status(500).json({ message: "Update failed due to an internal server error" })
  }
  const updated_formateur = await formateur.findById(formateur_id)

  return res.json(updated_formateur)
};

exports.updateMatiere_dispensee = async (req, res) => {
  const { id, matiere_dispensee } = req.body; // Extraction des données de la requête
  const formateurs = await formateur.updateMatiere_dispensee(id, matiere_dispensee); // Appel de la méthode updateNom_departement de la classe Departement
  if (res === null) {
    throw new Error("Update matricule failed due to an internal server error")
  }
  return res.json(formateurs)
}

exports.delete = async (req, res) => {
  // Récupération de l'ID du formateur
  const { formateur_id } = req.params;
  //   get the formateur from the database
  const formateurs = await formateur.findById(formateur_id)
  if (!formateurs) {
    return res.status(404).json({ message: "formateur not found." })
  }
  // Suppression du formateur de la base de données
  const result = await formateur.delete(formateur_id);
  if (result === null) {
    return res.status(500).json({ message: "Delete failed due to an internal server error" })
  }
  return res.json({ message: "formateur deleted successfully" })
};

exports.count = async (req, res) => {
  const formateurs = await formateur.count();
  if (formateurs === null) {
    // renvoyer 0 si le résultat est null
    res.json(0);
  } else if (typeof formateurs !== 'number') {
    // lancer une erreur si le résultat n'est pas un nombre
    return res.status(500).json({ message: 'Résultat invalide' });
  } else {
    // renvoyer le résultat en JSON
    res.json(formateurs);
  }
}
