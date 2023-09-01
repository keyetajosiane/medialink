const apprenant = require('../models/apprenantModels');
exports.getAll = async (req, res) => {
  const apprenand = await apprenant.findAll();
  res.json(apprenand);
};
exports.insert = async (req, res) => {
    const create_data = req.body;
       // check if the matricule is unique
   let  apprenand = await apprenant. findByMatricule(create_data.matricule)
    if (apprenand) {
        res.status(409).json({ message: "matricule already exist" });
        return;
    }
    const result = await apprenant.insert(create_data)
    if (result === false) {
        res.status(500).json({ message: "Unable to create this  apprenant due to an internal server error" });
        return;
    }
    // return the new user
    const new_apprenant =  await apprenant.findById(result)
    res.json(new_apprenant)
}; 

exports.getapprenantById = async (req, res) => {
  // Récupération de l'ID de l'apprenant
  const {apprenant_id} = req.params;
  // Recherche de l'utilisateur par ID
  const apprenand = await apprenant.findById(apprenant_id);
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
    const {apprenant_id} = req.params;
    // Récupération des données du formulaire
    const apprenant_update_data = req.body;
    // get the departement from the database
    const apprenand =  await apprenant.findById(apprenant_id)   // if the user does not exist, throw an error
    if (!apprenand) {
        return res.status(404).json({ message: "appprenant not found." })
    };
    for(const key of Object.keys(apprenant_update_data)){
        //TODO:: if the key is password, hash the password before saving it
        apprenand[key] = apprenant_update_data[key]
    }
    // Mise à jour du departement dans la base de données
    const result = await apprenant.updateApprenant(apprenant_id, apprenand);
    if(res === null){
        return res.status(500).json({message: "Update failed due to an internal server error"})
    }
    const updated_apprenant =  await apprenant.findById(apprenant_id)

    return res.json(updated_apprenant)
};
exports.updateMatricule = async (req, res) => {
  const { apprenant_id, matricule } = req.body; // Extraction des données de la requête
    const apprenand = await apprenant.updateMatricule(apprenant_id, matricule); // Appel de la méthode updateNom_departement de la classe Departement
    if(res === null){
        throw new Error("Update matricule failed due to an internal server error")
    }
    return res.json(apprenand)
}
exports.delete= async (req, res) => {
    // Récupération de l'ID de la permission
    const {apprenant_id} = req.params;
    //   get the user from the database
    const apprenand =  await apprenant.findById(apprenant_id)
    if (!apprenand) {
        return res.status(404).json({ message: "apprenant not found." })
    }
    // Suppression du departement de la base de données
    const result = await apprenant.delete(apprenant_id);
    if (res === null) {
        return res.status(500).json({message: "Delete failed due to an internal server error"})
    }
    return res.json({message: "apprenant deleted successfully"})
};

exports.deleteByMatricule = async (req, res) => {
    // Récupération de l'ID du departement
    const {matricule} = req.params;
    //   get the user from the database
    const apprenand = await apprenant.findByMatricule(matricule) 
    if (!apprenand) {
        return res.status(404).json({ message: "apprenant not found." })
    }
    // Suppression du departement de la base de données
    const result = await apprenant.deleteByMatricule(matricule);
    if (res === null) {
        return res.status(500).json({message: "Delete failed due to an internal server error"})
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
      return res.status(500).json({ message: 'Résultat invalide' });
    } else {
      // renvoyer le résultat en JSON
      res.json(capprenand);
    }
};

