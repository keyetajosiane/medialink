const administration_members = require('../models/administration_membersModels');
exports.getAll = async (req, res) => {
  const administration_member  = await administration_members.findAll();
  res.json(administration_member);
};
exports.insert = async (req, res) => {
    const create_data = req.body;
    // check if the id is unique
    let administration_member = await administration_members.findById(create_data.id)
    if (administration_member) {
        res.status(409).json({ message: "id of administration_members already exist" });
        return;
    }
    const result = await administration_members.insert(create_data)
    if (result === false) {
        res.status(500).json({ message: "Unable to create this administration_members due to an internal server error" });
        return; 
    }
    // return the new formateur
    const new_administration_members =  await administration_members.findById(result)
    res.json(new_administration_members)
}; 
  
exports.getadministration_membersById = async (req, res) => {
  // Récupération de l'ID de l'apprenant
  const {id} = req.params;
  // Recherche de l'utilisateur par ID
  const administration_member = await administration_members.findById(id);
  // Envoi de la réponse au format JSON
  res.json(administration_member);
};

  exports.getadministration_membersByPoste = async (req, res) => {
    // Récupération du poste de la ressource
    const {poste} = req.params;
    // Recherche de l'utilisateur par son poste
    const administration_member = await administration_members.findByPoste(poste)
    // Envoi de la réponse au format JSON
    res.json(administration_member);
  };
exports.updateAdministration_members = async (req, res) => {
    // Récupération de l'ID du departement
    const {id} = req.params;
    // Récupération des données du formulaire
    const administration_update_data = req.body;
    // get the departement from the database
    const administration_member = await administration_members.findById(id)   // if the user does not exist, throw an error
    if (!administration_member) {
        return res.status(404).json({ message: "administration_members not found." })
    }
    for(const key of Object.keys(administration_update_data)){
      //TODO:: if the key is password, hash the password before saving it
      administration_member[key] = administration_update_data[key]
    }
    // Mise à jour du departement dans la base de données
    const result = await administration_members.updateAdministration_members(id,administration_member);
    if(result === null){
        return res.status(500).json({message: "Update failed due to an internal server error"})
    }
    const updated_administration_members = await administration_members.findById(id)

    return res.json(updated_administration_members)
};

exports.updatePoste = async (req, res) => {
  const {id, poste} = req.body; // Extraction des données de la requête
    const Administration_member = await administration_members.updatePoste(id,poste) ; // Appel de la méthode updateNom_departement de la classe Departement
    if(res === null){
        throw new Error("Update poste failed due to an internal server error")
    }
    return res.json(Administration_member)
}



exports.delete = async (req, res) => {
    // Récupération de l'ID du formateur
    const {id } = req.params;
    //   get the formateur from the database
    const Administration_member =  await administration_members.findById(id)
    if (!Administration_member) {
        return res.status(404).json({ message: "administration_members not found." })
    }
    // Suppression du formateur de la base de données
    const result = await administration_members.delete(id);
    if (result === null) {
        return res.status(500).json({message: "Delete failed due to an internal server error"})
    }
    return res.json({message: "Administration_members deleted successfully"})
};
exports.deleteByPoste = async (req, res) => {
    // Récupération de l'ID du departement
    const {poste} = req.params;
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
    return res.json({message: "Administration_members deleted successfully"})
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

