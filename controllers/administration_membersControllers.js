const administration_members = require('../models/administration_membersModels');
const userModel = require('../models/userModels');
const userController = require('./userController');
const userPermissionsController = require('./userPermissionsController');
const authController = require('./authController');

exports.getAll = async (req, res) => {
  const administration_members = await administration_members.findAll();
  // inject the user
  if (administration_members) {
    for (let i = 0; i < administration_members.length; i++) {
      const user = await userController.getUserInfo(administration_members[i].user_id);
      administration_members[i] = { ...administration_members[i], ...user };
    }
  }
  res.json(administration_members);
};
exports.insert = async (req, res) => {
  const create_data = req.body;
  const _auth_user = authController.getCurrentUser(req.user);
  // poste should be provided
  if(!create_data.poste){
    res.status(400).json({ message: "poste is required" });
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

    const result = await administration_members.insert(create_data);
    if (result === false) {
      res.status(500).json({ message: "Unable to create this  administration member due to an internal server error" });
      return;
    }
    // return the new user
    let new_administration_members = await administration_members.findById(result);
    new_administration_members = { ...new_administration_members, ...user };
    return res.status(201).json(new_administration_members);
  });
};

exports.getadministration_membersById = async (req, res) => {
  // Récupération de l'ID de l'apprenant
  const { id } = req.params;
  // Recherche de l'utilisateur par ID
  const administration_member = await administration_members.findById(id);
  // inject the user
  if (administration_member) {
      const user = await userController.getUserInfo(administration_member.user_id);
      administration_member = { ...administration_member, ...user };
  }
  // Envoi de la réponse au format JSON
  res.json(administration_member);
};

exports.getadministration_membersByUserId = async (req, res) => {
  // Récupération de l'ID de l'apprenant
  const { user_id } = req.params;
  // Recherche de l'utilisateur par ID
  let administration_member = await administration_members.findByUserId(user_id);
  // inject the user
  if (administration_member) {
      const user = await userController.getUserInfo(administration_member.user_id);
      administration_member = { ...administration_member, ...user };
  }
  // Envoi de la sélection au format JSON
  res.json(administration_member);
}

exports.getadministration_membersByPoste = async (req, res) => {
  // Récupération du poste de la ressource
  const { poste } = req.params;
  // Recherche de l'utilisateur par son poste
  const administration_member = await administration_members.findByPoste(poste)
  // Envoi de la réponse au format JSON
  res.json(administration_member);
};
exports.updateAdministration_members = async (req, res) => {
  // Récupération de l'ID du departement
  const { id } = req.params;
  // Récupération des données du formulaire
  const administration_update_data = req.body;
  // get the departement from the database
  const administration_member = await administration_members.findById(id)   // if the user does not exist, throw an error
  if (!administration_member) {
    return res.status(404).json({ message: "administration_members not found." })
  }
  // update the user table
  const user_update_data = {
    first_name: administration_update_data.first_name,
    last_name: administration_update_data.last_name,
    email: administration_update_data.email,
    user_name: administration_update_data.user_name,
    role: administration_update_data.role,
    is_admin: administration_update_data.is_admin
  }
  const updated_user = userModel.updateUser(administration_member.user_id, user_update_data);
  if (updated_user === null) {
      return res.status(500).json({ message: "User info update failed due to an internal server error" })
  }
  // update the apprenant permissions
  const updated = await userPermissionsController.updateUserPermissions(administration_update_data.user_id, administration_update_data.permissions);
  if(!updated){
      return res.status(500).json({ message: "Update failed, could not update permissions" })
  }
  // Mise à jour du departement dans la base de données
  const update_data = {
      user_id: administration_update_data.user_id,
      poste: administration_update_data.poste,
  }
  const result = await administration_members.updateAdministration_members(id, update_data);
  if (result === null) {
    return res.status(500).json({ message: "Update failed due to an internal server error" })
  }
  const updated_administration_members = await administration_members.findById(id)

  return res.json(updated_administration_members)
};

exports.updatePoste = async (req, res) => {
  const { id, poste } = req.body; // Extraction des données de la requête
  const Administration_member = await administration_members.updatePoste(id, poste); // Appel de la méthode updateNom_departement de la classe Departement
  if (res === null) {
    throw new Error("Update poste failed due to an internal server error")
  }
  return res.json(Administration_member)
}



exports.delete = async (req, res) => {
  // Récupération de l'ID du formateur
  const { id } = req.params;
  //   get the formateur from the database
  const Administration_member = await administration_members.findById(id)
  if (!Administration_member) {
    return res.status(404).json({ message: "administration_members not found." })
  }
  // Suppression du formateur de la base de données
  const result = await administration_members.delete(id);
  if (result === null) {
    return res.status(500).json({ message: "Delete failed due to an internal server error" })
  }
  return res.json({ message: "Administration_members deleted successfully" })
};
exports.deleteByPoste = async (req, res) => {
  // Récupération de l'ID du departement
  const { poste } = req.params;
  //   get the user from the database
  const Administration_member = await administration_members.findByPoste(poste)
  if (!Administration_member) {
    throw new Error("Administration_members not found.")
  }
  // Suppression du departement de la base de données
  const result = await administration_members.deleteByPoste(poste);
  if (result === null) {
    throw new Error("Delete failed due to an internal server error")
  }
  return res.json({ message: "Administration_members deleted successfully" })
};
exports.count = async (req, res) => {
  const administration = await administration_members.count();
  if (administration === null) {
    // renvoyer 0 si le résultat est null
    res.json(0);
  } else if (typeof administration !== 'number') {
    // lancer une erreur si le résultat n'est pas un nombre
    return res.status(500).json({ message: 'Résultat invalide' });
  } else {
    // renvoyer le résultat en JSON
    res.json(administration);
  }
}

