const formateur = require('../models/formateurModels');
exports.getAll = async (req, res) => {
  const formateurs = await formateur.findAll();
  res.json(formateurs);
};

exports.insert = async (req, res) => {
    const create_data = req.body;
    // check if the id is unique
    let formateurs =await formateur.findById(create_data.formateur_id)
    if (formateurs) {
        throw new Error("id already exist")
    }
    const result = await formateur.insert(create_data)
    if (result === false) {
        throw new Error("Unable to create this formateur due to an internal server error")
    }
    // return the new formateur
    const new_formateur =await formateur.findById(result)
    res.json(new_formateur)
}; 
exports.getformateurById = async (req, res) => {
  // Récupération de l'ID de l'apprenant
  const {formateur_id} = req.params;
  // Recherche de l'utilisateur par ID
  const formateurs = await formateur.findById(formateur_id);
  // Envoi de la réponse au format JSON
  res.json(formateurs);
};

  exports.getformateurBymatiere_dispensee = async (req, res) => {
    // Récupération de l'ID de la ressource
    const {matiere_dispensee} = req.params;
    // Recherche de l'utilisateur par ID
    const formateurs = await formateur.findBymatiere_dispensee(matiere_dispensee) 
    // Envoi de la réponse au format JSON
    res.json(formateurs);
  };
exports.updateFormateur = async (req, res) => {
    // Récupération de l'ID du departement
    const {formateur_id} = req.params;
    // Récupération des données du formulaire
    const formateur_update_data = req.body;
    // get the departement from the database
    const formateurs = await formateur.findById(formateur_id)   // if the user does not exist, throw an error
    if (!formateurs) {
      return res.status(404).json({ message: "formateur not found." })
    }
    for(const key of Object.keys(formateur_update_data)){
        //TODO:: if the key is password, hash the password before saving it
        formateurs[key] = formateur_update_data[key]
    }
    // Mise à jour du departement dans la base de données
    const result = await formateur.updateFormateur(formateur_id, formateurs);
    if(result === null){
      return res.status(500).json({message: "Update failed due to an internal server error"})
    }
    const updated_formateur = await formateur.findById(formateur_id)

    return res.json(updated_formateur)
};

exports.updateMatiere_dispensee = async (req, res) => {
  const { id, matiere_dispensee } = req.body; // Extraction des données de la requête
    const formateurs = await formateur.updateMatiere_dispensee(id, matiere_dispensee); // Appel de la méthode updateNom_departement de la classe Departement
    if(res === null){
        throw new Error("Update matricule failed due to an internal server error")
    }
    return res.json(formateurs)
}

exports.delete = async (req, res) => {
    // Récupération de l'ID du formateur
    const {formateur_id } = req.params;
    //   get the formateur from the database
    const formateurs = await formateur.findById(formateur_id)
    if (!formateurs) {
      return res.status(404).json({ message: "formateur not found." })
    }
    // Suppression du formateur de la base de données
    const result = await formateur.delete(formateur_id);
    if (result === null) {
      return res.status(500).json({message: "Delete failed due to an internal server error"})
    }
    return res.json({message: "formateur deleted successfully"})
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
