const departement = require('../models/departementModels');
exports.getAll = async (req, res) => {
  const departemen = await  departement.findAll();
  res.json(departemen);
};
exports.insert = async (req, res) => {
    const create_data = req.body;
    // check if the name is unique
    let departemen =  await departement.findByNom_departement(create_data.nom_departement)
    if (departemen) {
        res.status(409).json({ message: "nom-departement already exist" });
        return;
    }
    const result =  await departement.insert(create_data)
    if (result === false) {
        res.status(500).json({ message: "Unable to create this departement due to an internal server error" });
        return;
    }
    // return the new user
    const new_departement = departement.findByDepartement_id(result)
    res.json(new_departement)
};
 
exports.getdepartementById = async (req, res) => {
  // Récupération de l'ID du departement
  const { departement_id } = req.params;
  // Recherche de l'utilisateur par ID
  const departemen = await departement.findByDepartement_id(departement_id);
  // Envoi de la réponse au format JSON
  res.json(departemen);
};
exports.getdepartementByNom = async (req, res) => {
    // Récupération de l'ID du departement
    const {nom_departement} = req.params;
    // Recherche de l'utilisateur par ID
    const departemen = await departement.findByNom_departement(nom_departement);
    // Envoi de la réponse au format JSON
    res.json(departemen);
  };
exports.update = async (req, res) => {
    // Récupération de l'ID du departement
    const {departement_id} = req.params;
    // Récupération des données du formulaire
    const departement_update_data = req.body;
    // get the departement from the database
    const departemen = departement.findByDepartement_id(departement_id)
    // if the user does not exist, throw an error
    if (!departemen) {
        throw new Error("departement not found")
    }
    for(const key of Object.keys(departement_update_data)){
        //TODO:: if the key is password, hash the password before saving it
        departemen[key] = departement_update_data[key]
    }
    // Mise à jour du departement dans la base de données
    const result = await departement.updateDepartement(departement_id, departemen);
    if(result === null){
        throw new Error("Update failed due to an internal server error")
    }
    const updated_departement = departement.findByDepartement_id(departement_id)

    return res.json(updated_departement)
};

exports.updateNomDepartement = async (req, res) => {
  const { departement_id, nom_departement } = req.body; // Extraction des données de la requête
    const result = await departement.updateNom_departement(departement_id, nom_departement); // Appel de la méthode updateNom_departement de la classe Departement
    if(result === null){
        throw new Error("Update nom departement failed due to an internal server error")
    }
    return res.json(result)
}
exports.deleteById = async (req, res) => {
    // Récupération de l'ID du departement
    const { departement_id } = req.params;
    //   get the user from the database
    const departemen = departement.findBydepartement_id(departement_id)
    if (!departemen) {
        throw new Error("departement not found.")
    }
    // Suppression du departement de la base de données
    const result = await departement.deleteById(departement_id);
    if (result === null) {
        throw new Error("Delete failed due to an internal server error")
    }
    return res.json({message: "departement deleted successfully"})
};

exports.deleteByNom = async (req, res) => {
    // Récupération de l'ID du departement
    const {nom_departement} = req.params;
    //   get the user from the database
    const departemen = departement.findByNom_departement(nom_departement)
    if (!departemen) {
        throw new Error("departement not found.")
    }

    // Suppression du departement de la base de données
    const result = await departement.deleteByNom(nom_departement);
    if (result === null) {
        throw new Error("Delete failed due to an internal server error")
    }
    return res.json({message: "departement deleted successfully"})
};
exports.count = async (req, res) => {
    const departemen = await departement.count();
    if (departemen === null) {
      // renvoyer 0 si le résultat est null
      res.json(0);
    } else if (typeof departemen !== 'number') {
      // lancer une erreur si le résultat n'est pas un nombre
      throw new Error('Résultat invalide');
    } else {
      // renvoyer le résultat en JSON
      res.json(departemen);
    }
}
