const ressource = require('../models/ressourceModels');
exports.getAll = async (req, res) => {
  const allressource = await ressource.findAll();
  res.json(allressource);
};
exports.insert = (req, res) => {
  const create_data = req.body;
  // check if the id is unique
  let insertressource = ressource.getressource_id(create_data.ressources_id)
  if (insertressource) {
      throw new Error("id already exist")
  }
  // check if the name is unique
  insertressource = ressource.getRessourceByTitlle(create_data.titlle)
  if (insertressource) {
      throw new Error("titlle already exist")
  }
  const result = ressource.insert(create_data)
  if (result === false) {
      throw new Error("Unable to create this ressource due to an internal server error")
  }
  // return the new user
  const new_ressource = ressource.findByRessources_id.
  res.json(new_ressource)
};

exports.getRessourceById = async (req, res) => {
  // Récupération de l'ID de la resssource
  const { ressources_id } = req.params;
  // Recherche de l'utilisateur par ID
  const fressource = await ressource.findByRessources_id(ressources_id);
  // Envoi de la réponse au format JSON
  res.json(fressource);
};
exports.getRessourceByTitlle = async (req, res) => {
    // Récupération de l'ID de la ressource
    const {titlle} = req.params;
    // Recherche de l'utilisateur par ID
    const tressource = await ressource.findByTitlle(titlle);
    // Envoi de la réponse au format JSON
    res.json(tressource);
  };
  exports.getRessourceByDescription = async (req, res) => {
    // Récupération de l'ID de la ressource
    const {description} = req.params;
    // Recherche de l'utilisateur par ID
    const dressource = await ressource.findByDescription(description);
    // Envoi de la réponse au format JSON
    res.json(dressource);
  };

exports.updateRessource = async (req, res) => {
    // Récupération de l'ID du departement
    const {ressources_id} = req.params;
    // Récupération des données du formulaire
    const ressource_update_data = req.body;
    // get the departement from the database
    const uressource = ressource.findByRessources_id(ressources_id)   // if the user does not exist, throw an error
    if (!uressource) {
        throw new Error("ressource not found")
    }
    for(const key of Object.keys(ressource_update_data)){
        //TODO:: if the key is password, hash the password before saving it
        uressource[key] = ressource_update_data[key]
    }
    // Mise à jour du departement dans la base de données
    const result = await ressource.updateRessource(ressources_id, uressource);
    if(result === null){
        throw new Error("Update failed due to an internal server error")
    }
    const updated_ressource = ressource.findByRessources_id(ressources_id)

    return res.json(updated_ressource)
};

exports.updateTitlle = async (req, res) => {
  const { ressources_id, titlle } = req.body; // Extraction des données de la requête
    const tressource = await ressource.updateTitlle(ressources_id, titlle); // Appel de la méthode updateNom_departement de la classe Departement
    if(res === null){
        throw new Error("Update titlle failed due to an internal server error")
    }
    return res.json(tressource)
}


exports.updateDescription = async (req, res) => {
    const { ressources_id, description } = req.body; // Extraction des données de la requête
      const dressource = await ressource.updateDescription(ressources_id, description); // Appel de la méthode updateNom_departement de la classe Departement
      if(res === null){
          throw new Error("Update description failed due to an internal server error")
      }
      return res.json(dressource)
  }

exports.deleteById = async (req, res) => {
    // Récupération de l'ID du departement
    const {ressources_id } = req.params;
    //   get the user from the database
    const dressource = ressource.delete(ressources_id)
    if (!dressource) {
        throw new Error("ressource not found.")
    }

    // Suppression du departement de la base de données
    const result = await ressource.delete(ressources_id);
    if (result === null) {
        throw new Error("Delete failed due to an internal server error")
    }
    return res.json({message: "ressource deleted successfully"})
};

exports.deleteByTitlle = async (req, res) => {
    // Récupération de l'ID du departement
    const {titlle} = req.params;
    //   get the user from the database
    const tressource = ressource.findByTitlle(titlle)
    if (!tressource) {
        throw new Error("ressource not found.")
    }

    // Suppression du departement de la base de données
    const result = await ressource.deleteByTitlle(titlle);
    if (result === null) {
        throw new Error("Delete failed due to an internal server error")
    }
    return res.json({message: "ressource deleted successfully"})
};
exports.count = async (req, res) => {
    const cressource = await ressource.count();
    if (cressource === null) {
      // renvoyer 0 si le résultat est null
      res.json(0);
    } else if (typeof cressource !== 'number') {
      // lancer une erreur si le résultat n'est pas un nombre
      throw new Error('Résultat invalide');
    } else {
      // renvoyer le résultat en JSON
      res.json(cressource);
    }
}