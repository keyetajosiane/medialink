const ressource = require('../models/ressourceModels');
exports.getAll = async (req, res) => {
  const allressource = await ressource.findAll();
  res.json(allressource);
};
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

exports.insert = async (req, res) => {
  const create_data = req.body;
  console.log(create_data);
  // Vérifier si le titre est unique
  let departemen = await ressource.findByTitlle(create_data.tittle);
  if (departemen) {
    // Renvoyer un code 409 et sortir de la fonction
    return res.status(409).json({ message: "Title already exists" });
  }

  // Vérifier s'il y a des fichiers téléchargés
  if (!req.files || req.files.length === 0) {
    // Renvoyer un code 400 et sortir de la fonction
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Déplacer les fichiers téléchargés vers le dossier "opload"
  const uploadedFiles = req.files;
  const fileURLs = [];

  for (const file of uploadedFiles) {
    const uniqueFilename = uuidv4(); // Générer un nom de fichier unique
    const filePath = path.join(__dirname, '../opload', uniqueFilename); // Chemin du fichier dans le dossier "opload"

    // Déplacer le fichier téléchargé vers le dossier "opload"
    fs.renameSync(file.path, filePath);

    // Enregistrer l'URL du fichier dans le tableau
    const fileURL = `/opload/${uniqueFilename}`;
    fileURLs.push(fileURL);
  }

  // Enregistrer l'URL de la ressource dans votre base de données
  const result = await ressource.insert(req, res, { ...create_data, files: fileURLs });

  if (!result) {
    // Renvoyer un code 500 et sortir de la fonction
    return res.status(500).json({ message: "Unable to create this resource due to an internal server error" });
  }

  // Récupérer la nouvelle ressource
  const new_departement = await ressource.findByRessources_id(result);

  // Renvoyer un code 201 et la ressource créée
  res.json(new_departement);
};

exports.getRessourceById = async (req, res) => {
  // Récupération de l'ID de la resssource
  const { ressources_id } = req.params;
  if (!ressource) {
      return res.status(400).json({message: "ressource is required"})
  }
  // Recherche de l'utilisateur par ID
  const fressource = await ressource.findByRessources_id(ressources_id);
  // Envoi de la réponse au format JSON
  return res.json(fressource);
};
exports.getRessourceByTitlle = async (req, res) => {
    // Récupération de l'ID de la ressource
    const {tittle} = req.params;
    if (!ressource) {
      return res.status(400).json({message: "ressource is required"})
  }
    // Recherche de l'utilisateur par ID
    const tressource = await ressource.findByTitlle(tittle);
    // Envoi de la réponse au format JSON
     return res.json(tressource);
  };
  exports.getRessourceByDescription = async (req, res) => {
    // Récupération de l'ID de la ressource
    const {description} = req.params;
    if (!ressource) {
      return res.status(400).json({message: "ressource is required"})
  }
    // Recherche de l'utilisateur par ID
    const dressource = await ressource.findByDescription(description);
    // Envoi de la réponse au format JSON
    return res.json(dressource);
  };



exports.updateRessource = async (req, res) => {
    // Récupération de l'ID du departement
    const {ressources_id} = req.params;
    // Récupération des données du formulaire
    const ressource_update_data = req.body;
    // get the departement from the database
    const uressource = await ressource.findByRessources_id(ressources_id)   // if the user does not exist, throw an error
    if (!uressource) {
      return res.status(404).json({ message: "resource  not found." })
    }
    for(const key of Object.keys(ressource_update_data)){
        //TODO:: if the key is password, hash the password before saving it
        uressource[key] = ressource_update_data[key]
    }
    // Mise à jour du departement dans la base de données
    const result = await ressource.updateRessouces (ressources_id, uressource);
    if(result === null){
      return res.status(500).json({message: "Update failed due to an internal server error"})
    }
    const updated_ressource = await ressource.findByRessources_id(ressources_id)

    return res.json(updated_ressource)
};

exports.updateTitlle = async (req, res) => {
  const { ressources_id, tittle } = req.body; // Extraction des données de la requête
    const tressource = await ressource.updateTitlle(ressources_id, tittle); // Appel de la méthode updateNom_departement de la classe Departement
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
    const dressource = await ressource.findByRessources_id(ressources_id)
    if (!dressource) {
      return res.status(404).json({ message: "ressource not found." })
    }

    // Suppression du departement de la base de données
    const result = await ressource.delete(ressources_id);
    if (result === null) {
      return res.status(500).json({message: "Delete failed due to an internal server error"})
    }
    return res.json({message: "ressource deleted successfully"})
};

exports.deleteByTitlle = async (req, res) => {
    // Récupération de l'ID du departement
    const {tittle} = req.params;
    //   get the user from the database
    const tressource = ressource.findByTitlle(tittle)
    if (!tressource) {
        throw new Error("ressource not found.")
    }

    // Suppression du departement de la base de données
    const result = await ressource.deleteByTitlle(tittle);
    if (result === null) {
        throw new Error("Delete failed due to an internal server error")
    }
    return res.json({message: "ressource deleted successfully"})
};
 
exports.count = async (req, res) => {
    const cressource = await ressource.count();
    if (cressource === null) {
      // renvoyer 0 si le résultat est null
     return res.json(0);
    } else if (typeof cressource !== 'number') {
      // lancer une erreur si le résultat n'est pas un nombre
      return res.status(500).json({ message: 'Résultat invalide' });
    } else {
      // renvoyer le résultat en JSON
      return res.json(cressource);
    }
}