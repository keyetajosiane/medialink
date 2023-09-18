const ressource = require('../models/ressourceModels');
const authController = require('../controllers/authController');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const uploadFolderPath = path.join(__dirname, '..', 'upload');

exports.getAll = async (req, res) => {
  const allressource = await ressource.findAll();
  // modify the resource url to return the absolute path based on the server host
  allressource.forEach((ressource) => {
    ressource.url = `${req.protocol}://${req.get('host')}${ressource.url}`
  })
  res.json(allressource);
};

// Vérifier si l'utilisateur a la permission "ressource_create"
if (!req.user.permissions.includes('ressource_create')) {
  return res.status(403).json({ message: 'You do not have permission to create this resource' });
}
exports.insert = async (req, res) => {
  const resourceData = req.body;
  // get current user
  const user_uid = req.user;
  const user = await authController.getCurrentUser(user_uid);
  if(!user) return res.sendStatus(401);
  resourceData.user_id = user.user_id;
  // Check if title is unique
  let existingResource = await ressource.findByTitlle(resourceData.title);
  if (existingResource) {
    // Return a 409 code and exit the function
    return res.status(409).json({ message: "Title already exists" });
  }

  // Check if there is an uploaded file
  if (!req.files) {
    // Return a 400 code and exit the function
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Move uploaded file to "upload" folder
    const uploadedFile = req.files[0];
    const uniqueFilename = `${uuidv4()}-${uploadedFile.originalname}`; // Generate a unique filename that includes the original file name
    const filePath = path.join(__dirname, '..', 'upload', uniqueFilename); // File path in "upload" folder

    // Move uploaded file to "upload" folder
    fs.renameSync(uploadedFile.path, filePath);

    // Save file URL in array
    const fileURL = path.join('/upload', uniqueFilename);

    // Save resource URL in your database
    const insertResult = await ressource.insert({ ...resourceData, url: fileURL });

    if (!insertResult) {
      // Return a 500 code and exit the function
      return res.status(500).json({ message: "Unable to create this resource due to an internal server error" });
    }

    // Get new resource
    const newResource = await ressource.findByRessources_id(insertResult);

    // Return a 201 code and created resource
    res.json(newResource);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while processing your request." });
  }
};
exports.getRessourceById = async (req, res) => {
  // Récupération de l'ID de la resssource
  const { ressources_id } = req.params;
  if (!ressource) {
      return res.status(400).json({message: "ressource is required"})
  }
  // Recherche de l'utilisateur par ID
  const fressource = await ressource.findByRessources_id(ressources_id);
  // if resource not found
  if (!fressource) {
      return res.status(404).json({message: "ressource not found"})
  }

  // modify the resource url to return the absolute path based on the server host
  fressource.url = `${req.protocol}://${req.get('host')}${fressource.url}`

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