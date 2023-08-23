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
        throw new Error("email already exist")
    }

    // check if the user_name is unique
    user = await User.findByUser_nameOrEmail(create_data.user_name)
    if (user) {
        throw new Error("user_name already exist")
    }
    const result = await User.create(create_data)
    if (result === false) {
        throw new Error("Unable to create this user due to an internal server error")
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
    const {user_name} = req.params;
    const user = await User.findByUser_nameOrEmail(user_name)

    return res.json(user)
}
exports.getUserByEmail = async (req, res) => {
    const {email} = req.params;
    const user = await User.findByEmail(email)
    return res.json(user)
}
exports.update = async (req, res) => {
    // Récupération de l'ID de l'utilisateur
    const { user_id } = req.params;
    // Récupération des données du formulaire
    const user_update_data = req.body;
    // get the user from the database
    const user = await User.findByUser_id(user_id)
    // if the user does not exist, throw an error
    if (!user) {
        throw new Error("User not found")
    };
    for(const key of Object.keys(user_update_data)){
        //TODO:: if the key is password, hash the password before saving it
        user[key] = user_update_data[key];
    };
    // Mise à jour de l'utilisateur dans la base de données
    const result = await User.updateUser(user_id, user);
    if(res === null){
        throw new Error("Update failed due to an internal server error")
    };
    const updated_user = await User.findByUser_id(user_id)

    return res.json(updated_user)
};  

exports.delete = async (req, res) => {
    // Récupération de l'ID de l'utilisateur
    const { user_id } = req.params;
    //   get the user from the database
    const user = await User.findByUser_id(user_id)
    if (!user) {
        throw new Error("User not found.")
    }
    // Suppression de l'utilisateur de la base de données
    const result = await User.delete(user_id);
    if (res === null) {
        throw new Error("Delete failed due to an internal server error")
    }
    return res.json({message: "User deleted successfully"})
};
    exports.count = async (req, res) => {
        const users = await User.count();
        if (users === null) {
          // renvoyer 0 si le résultat est null
          res.json(0);
        } else if (typeof users !== 'number') {
          // lancer une erreur si le résultat n'est pas un nombre
          throw new Error('Résultat invalide');
        } else {
          // renvoyer le résultat en JSON
          res.json(users);
        }
    };
