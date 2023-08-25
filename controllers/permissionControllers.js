const permission = require('../models/permissionModels');
exports.getAll = async (req, res) => {
  const permissions = await permission.findAll();
  res.json(permissions);
};

exports.insert = async (req, res) => {
    const create_data = req.body;
    // check if the name is unique
     let permissions = await permission.findByNom(create_data.nom)
    if (permissions) {
        res.status(409).json({ message: "permission_name already exist" });
        return;
    }
    const result = await permission.insert(create_data)
    if (result === false) {
        res.status(500).json({ message: "Unable to create this permission due to an internal server error" });
        return;
    }
    // return the new user
    const new_permission = await permission.findByPermissions_id(result)
    res.json(new_permission)
};

exports.getpermissionById = async (req, res) => {
  // Récupération de l'ID de la resssource
  const { permissions_id } = req.params;
  // Recherche de l'utilisateur par ID
  const permissions = await permission.findByPermissions_id(permissions_id);
  // Envoi de la réponse au format JSON
  res.json(permissions);
};
  exports.getpermissionByNom = async (req, res) => {
    // Récupération de l'ID de la ressource
    const { nom } = req.params;
    // Recherche de l'utilisateur par ID
    const permissions = await permission.findByNom(nom);
    // Envoi de la réponse au format JSON
    res.json(permissions);
  };

exports.updatePermission = async (req, res) => {
    // Récupération de l'ID du departement
    const {permissions_id} = req.params;
    // Récupération des données du formulaire
    const permission_update_data = req.body;
    // get the departement from the database
    const permissions =  await permission.findByPermissions_id(permissions_id)   // if the user does not exist, throw an error
    if (!permissions) {
        return res.status(404).json({ message: "permission not found." })
    }
    for(const key of Object.keys(permission_update_data)){
        //TODO:: if the key is password, hash the password before saving it
        permissions[key] = permission_update_data[key]
    }
    // Mise à jour du departement dans la base de données
    const result = await permission.updatePermission(permissions_id, permissions);
    if(result === null){
        return res.status(500).json({message: "Update failed due to an internal server error"})
    }
    const updated_permission = await permission.findByPermissions_id(permissions_id) 
    return res.json(updated_permission)
};

exports.updateNom = async (req, res) => {
  const { permissions_id, nom } = req.body; // Extraction des données de la requête
    const permissions = await permission.updateNom(permissions_id, nom); // Appel de la méthode updateNom_departement de la classe Departement
    if(res === null){
        throw new Error("Update nom failed due to an internal server error")
    }
    return res.json(permissions)
}

exports.delete = async (req, res) => {
    // Récupération de l'ID de la permission
    const {permissions_id } = req.params;
    //   get the user from the database
    const permissions = permission.findByPermissions_id(permissions_id)
    if (!permissions) {
        throw new Error("permissions not found.")
    }
    // Suppression du departement de la base de données
    const result = await permission.delete(permissions_id);
    if (res === null) {
        return res.status(500).json({message: "Delete failed due to an internal server error"})
    }
    return res.json({message: "permission deleted successfully"})
};
exports.deleteByNom = async (req, res) => {
    // Récupération de l'ID du departement
    const {nom} = req.params;
    //   get the user from the database
    const permissions =  await permission.findByNom(nom)
    if (!permissions) {
        throw new Error("permission not found.")
    }
    // Suppression du departement de la base de données
    const result = await permission.deleteByNom(nom);
    if (result === null) {
        throw new Error("Delete failed due to an internal server error")
    }
    return res.json({message: "permission deleted successfully"})
};
exports.count = async (req, res) => {
    const permissions = await permission.count();
    if (permissions === null) {
      // renvoyer 0 si le résultat est null
      res.json(0);
    } else if (typeof permissions !== 'number') {
      // lancer une erreur si le résultat n'est pas un nombre
      throw new Error('Résultat invalide');
    } else {
      // renvoyer le résultat en JSON
      res.json(permissions);
    }
}