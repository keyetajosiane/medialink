const User = require('../models/userModels');
exports.getAll = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};
exports.create = async (req, res) => {
    const create_data = req.body;
    // check if the email is unique
    let user = await User.findByEmail(create_data.email)
    if (user) {
        res.status(409).json({ message: "email already exist" });
        return;
    }

    // check if the user_name is unique
    user = await User.findByUser_nameOrEmail(create_data.user_name)
    if (user) {
        res.status(409).json({ message: "user_name already exist" });
        return;
    }
    const result = await User.create(create_data)
    if (result === false) {
        res.status(500).json({ message: "Unable to create this user due to an internal server error" });
        return;
    }
    // return the new user
    const new_user = await User.findByUser_id(result)
    res.json(new_user)
};


exports.getUserById = async (req, res) => {
  // Récupération de l'ID de l'utilisateur
  const { user_id } = req.params;
  // Recherche de l'utilisateur par ID
  const user = await User.findByUser_id(user_id);
  // Envoi de la réponse au format JSON
  res.json(user);
};

exports.getUserByuser_nameOrEmail = async (req, res) => {
    const {user_name} = req.query;
    if (!user_name) {
        return res.status(400).json({message: "User name or email is required"})
    }
    const user = await User.findByUser_nameOrEmail(user_name)

    return res.json(user)
}
exports.getUserByEmail = async (req, res) => {
    const {email} = req.query;
    if (!email) {
        return res.status(400).json({message: "Email is required"})        
    }
    const user = await User.findByEmail(email)
    return res.json(user)
}
exports.update = async (req, res) => {
  try {
    // Récupération de l'ID de l'utilisateur
    const { user_id } = req.params;
    // Récupération des données du formulaire
    const user_update_data = req.body;
    // get the user from the database
    const user = await User.findByUser_id(user_id)
    // if the user does not exist, throw an error
    if (!user) {
        return res.status(404).json({ message: "User not found." })
    };
    for(const key of Object.keys(user_update_data)){
        //TODO:: if the key is password, hash the password before saving it
        user[key] = user_update_data[key];
    };
    // Mise à jour de l'utilisateur dans la base de données
    const result = await User.updateUser(user_id, user);
    if(res === null){
        return res.status(500).json({message: "Update failed due to an internal server error"})
    };
    const updated_user = await User.findByUser_id(user_id)

    return res.json(updated_user)
};  

exports.delete = async (req, res) => {
  try {
    // Récupération de l'ID de l'utilisateur
    const { user_id } = req.params;
    //   get the user from the database
    const user = await User.findByUser_id(user_id)
    if (!user) {
        return res.status(404).json({ message: "User not found." })
    }
    // Suppression de l'utilisateur de la base de données
    const result = await User.delete(user_id);
    if (res === null) {
        return res.status(500).json({message: "Delete failed due to an internal server error"})
    }
    return res.json({message: "User deleted successfully"})
};
    exports.count = async (req, res) => {
        const users = await User.count();
        if (users === null) {
          // renvoyer 0 si le résultat est null
          return res.json(0);
        } else if (typeof users !== 'number') {
          // lancer une erreur si le résultat n'est pas un nombre
          return res.status(500).json({ message: 'Résultat invalide' });
        } else {
          // renvoyer le résultat en JSON
          return res.json(users);
        }
    };
