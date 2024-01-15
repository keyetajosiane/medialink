const formateur = require('../models/formateurModels');
const departement = require('../models/departementModels');
const departement_formateur = require('../models/departement_formateurModels');
const userModel = require('../models/userModels');
const userController = require('./userController');
const userPermissionsController = require('./userPermissionsController');
const dep_formateur_controller = require('./departement_formateurControllers');
const authController = require('./authController');

exports.getAll = async (req, res) => {
  const formateurs = await formateur.findAll();
  // inject the user
  if (formateurs) {
    for (let i = 0; i < formateurs.length; i++) {
      const user = await userController.getUserInfo(formateurs[i].user_id);
      formateurs[i] = { ...formateurs[i], ...user };
    }
  }
  res.json(formateurs);
};

exports.create = async (req, res) => {
  const create_data = req.body;
  const _auth_user = authController.getCurrentUser(req.user);
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
    create_data['created_by'] = _auth_user.user_id;

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
    let new_form = await formateur.findById(formateur_id);
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
  // inject the user
  if (formateurs) {
    const user = await userController.getUserInfo(formateurs.user_id);
    formateurs = { ...formateurs, ...user };
  }
  // Envoi de la réponse au format JSON
  res.json(formateurs);
};

exports.getformateurByUserId = async (req, res) => {
  // Récupération de l'ID de l'apprenant
  const { user_id } = req.params;
  // Recherche de l'utilisateur par ID
  let _formateur = await formateur.findByUserId(user_id);
  // inject the user
  if (_formateur) {
    const user = await userController.getUserInfo(_formateur.user_id);
    _formateur = { ..._formateur, ...user };
  }
  // inject the departements
  if (_formateur) {
    const departements = await departement_formateur.findFormateurDepartementsIDs(_formateur.formateur_id);
    _formateur.departements = departements.map(departement => departement.departement_id);
  }
  // Envoi de la réponse au format JSON
  res.json(_formateur);
}

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
  const _formateur = await formateur.findById(formateur_id)   // if the user does not exist, throw an error
  if (!_formateur) {
    return res.status(404).json({ message: "formateur not found." })
  }
  // update the user table
  const user_update_data = {
    first_name: formateur_update_data.first_name,
    last_name: formateur_update_data.last_name,
    email: formateur_update_data.email,
    user_name: formateur_update_data.user_name,
    role: formateur_update_data.role,
    is_admin: formateur_update_data.is_admin
  }
  const updated_user = userModel.updateUser(formateur_update_data.user_id, user_update_data);
  if (updated_user === null) {
    return res.status(500).json({ message: "User info update failed due to an internal server error" })
  }
  // update the apprenant permissions
  const updated = await userPermissionsController.updateUserPermissions(formateur_update_data.user_id, formateur_update_data.permissions);
  if (!updated) {
    return res.status(500).json({ message: "Update failed, could not update permissions" })
  }

  // update the formateur departements table
  try {
    const updated = await dep_formateur_controller.updateDepartement_formateur(formateur_id, formateur_update_data.departements)
  } catch (error) {
    return res.status(error.code).json({ message: "Update failed, could not update departements" })
  }

  return res.json(_formateur)
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
