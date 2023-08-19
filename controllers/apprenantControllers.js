const apprenant = require('../models/apprenantModels');
exports.getAll = async (req, res) => {
  const apprenand = await apprenant.findAll();
  res.json(apprenand);
};
exports.insert = (req, res) => {
    const create_data = req.body;
    // check if the id is unique
    let apprenand = apprenant.getapprenantById(create_data.id)
    if (apprenand) {
        throw new Error("id already exist")
    }
    // check if the name is unique
    apprenand = apprenant.getApprenantByMatricule(create_data.matricule)
    if (apprenand) {
        throw new Error("matricule already exist")
    }
    const result =  apprenant.insert(create_data)
    if (result === false) {
        throw new Error("Unable to create this apprenant due to an internal server error")
    }
    // return the new user
    const new_apprenant = apprenant.findById(result)
    res.json(new_apprenant)
}; 
exports.getapprenantById = async (req, res) => {
  // Récupération de l'ID de l'apprenant
  const {id} = req.params;
  // Recherche de l'utilisateur par ID
  const apprenand= await apprenant.findById(id);
  // Envoi de la réponse au format JSON
  res.json(apprenand);
};

  exports.getApprenantByMatricule = async (req, res) => {
    // Récupération de l'ID de la ressource
    const {matricule} = req.params;
    // Recherche de l'utilisateur par ID
    const apprenand = await apprenant.findByMatricule(matricule);
    // Envoi de la réponse au format JSON
    res.json(apprenand);
  };

exports.updateApprenant = async (req, res) => {
    // Récupération de l'ID du departement
    const {id} = req.params;
    // Récupération des données du formulaire
    const apprenant_update_data = req.body;
    // get the departement from the database
    const apprenand = apprenant.findById(id)   // if the user does not exist, throw an error
    if (!apprenand) {
        throw new Error("apprenant not found")
    }
    for(const key of Object.keys(apprenant_update_data)){
        //TODO:: if the key is password, hash the password before saving it
        apprenand[key] = apprenant_update_data[key]
    }
    // Mise à jour du departement dans la base de données
    const result = await apprenant.updateApprenant(id, apprenand);
    if(result === null){
        throw new Error("Update failed due to an internal server error")
    }
    const updated_apprenant = apprenant.findById(id)

    return res.json(updated_apprenant)
};
exports.updateMatricule = async (req, res) => {
  const { id, matricule } = req.body; // Extraction des données de la requête
    const apprenand = await apprenant.updateMatricule(id, matricule); // Appel de la méthode updateNom_departement de la classe Departement
    if(res === null){
        throw new Error("Update matricule failed due to an internal server error")
    }
    return res.json(apprenand)
}
exports.delete= async (req, res) => {
    // Récupération de l'ID de la permission
    const {id } = req.params;
    //   get the user from the database
    const apprenand = apprenant.findById(id)
    if (!apprenand) {
        throw new Error("apprenant not found.")
    }
    // Suppression du departement de la base de données
    const result = await apprenant.delete(id);
    if (result === null) {
        throw new Error("Delete failed due to an internal server error")
    }
    return res.json({message: "apprenant deleted successfully"})
};

exports.deleteByMatricule = async (req, res) => {
    // Récupération de l'ID du departement
    const {matricule} = req.params;
    //   get the user from the database
    const apprenand = apprenant.findByMatricule(matricule) 
    if (!apprenand) {
        throw new Error("apprenant not found.")
    }
    // Suppression du departement de la base de données
    const result = await apprenant.deleteByMatricule(matricule);
    if (result === null) {
        throw new Error("Delete failed due to an internal server error")
    }
    return res.json({message: "apprenant deleted successfully"})
};


exports.deleteById = async (req, res) => {
    // Récupération de l'ID du departement
    const {id} = req.params;
    //   get the user from the database
    const apprenand = apprenant.findById(id)
    if (!apprenand) {
        throw new Error("apprenant not found.")
    }
    // Suppression du departement de la base de données
    const result = await apprenant.deleteById(id);
    if (result === null) {
        throw new Error("Delete failed due to an internal server error")
    }
    return res.json({message: "apprenant deleted successfully"})
};
exports.count = async (req, res) => {
    const capprenand = await apprenant.count();
    if (capprenand === null) {
      // renvoyer 0 si le résultat est null
      res.json(0);
    } else if (typeof capprenand !== 'number') {
      // lancer une erreur si le résultat n'est pas un nombre
      throw new Error('Résultat invalide');
    } else {
      // renvoyer le résultat en JSON
      res.json(apprenand);
    }
};

