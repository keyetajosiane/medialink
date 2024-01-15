const User = require('../models/userModels');
const Permissions = require('../models/permissionModels');
const User_Permissions = require('../models/userPermissionsModel');
const passport = require('passport');

exports.getAll = async (req, res) => {
    const users = await User.findAll();

    //Inject the permissions
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        user.permissions = await User_Permissions.findUserPermissionsIds(user.user_id);
    }
    res.json(users);
};
exports.create = async (req, res, callBack = null) => {
    const create_data = req.body;
    // username, password, role and email are required
    if (!create_data.user_name || !create_data.password || !create_data.role || !create_data.email) {
        if (callBack) {
            return callBack({ message: "username, password, role and email are required", status: 400 });
        }
        res.status(400).json({ message: "username, password, role and email are required" });
        return;
    }

    // check if the email is unique
    let user = await User.findByEmail(create_data.email)
    if (user) {
        if (callBack) {
            return callBack({ message: "email already exist", status: 409 });
        }
        res.status(409).json({ message: "email already exist" });
        return;
    }
    // check if the user_name is unique
    user = await User.findByUser_nameOrEmail(create_data.user_name)
    if (user) {
        if (callBack) {
            return callBack({ message: "user_name already exist", status: 409 });
        }
        res.status(409).json({ message: "user_name already exist" });
        return;
    }
    // insert the user in the users table
    const user_id = await User.create(create_data)
    if (user_id === false) {
        if (callBack) {
            return callBack({ message: "Unable to create this user due to an internal server error", status: 500 });
        }
        res.status(500).json({ message: "Unable to create this user due to an internal server error" });
        return;
    }
    // get the permissions from the request body
    const permissions = create_data.permissions;
    if (permissions) {
        // insert the associations between the user and the permissions in the user_permissions table
        for (let permissions_id of permissions) {
            // get the permission id from the permissions table
            const existing_permission = await Permissions.findByPermissions_id(permissions_id);
            if (existing_permission === null) {
                continue
            }
            // insert the association in the user_permissions table
            const result = await User_Permissions.insert({ user_id, permissions_id });
            if (result === false) {
                console.log("An internal server error occured when associating the user to his permissions");
                continue
            }
        }
    }
    // return the new user with his permissions
    const new_user = await User.findByUser_id(user_id)
    delete new_user.password; // supprimer le mot de passe de l'objet new_user
    new_user.permissions = permissions; // ajouter le champ permissions à l'objet new_user
    if (callBack) {
        return callBack({ user: new_user, status: 201 });
    }
    return res.status(201).json(new_user)
};



exports.getUserById = async (req, res) => {
    // Récupération de l'ID de l'utilisateur
    const { user_id } = req.params;
    // Recherche de l'utilisateur par ID
    const user = await User.findByUser_id(user_id);
    // Envoi de la réponse au format JSON
    delete user.password; // supprimer le mot de passe de l'objet new_user
    // Inject the permissions
    user.permissions = await User_Permissions.findUserPermissionsIds(user.user_id);
    res.json(user);
};

exports.getUserByuser_nameOrEmail = async (req, res) => {
    const { user_name } = req.query;
    if (!user_name) {
        return res.status(400).json({ message: "User name or email is required" })
    }
    const user = await User.findByUser_nameOrEmail(user_name)
    // Inject the permissions
    user.permissions = await User_Permissions.findUserPermissionsIds(user.user_id);

    return res.json(user)
}
exports.getUserByEmail = async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ message: "Email is required" })
    }
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
        return res.status(404).json({ message: "User not found." })
    };
    for (const key of Object.keys(user_update_data)) {
        //TODO:: if the key is password, hash the password before saving it
        user[key] = user_update_data[key];
    };
    // Mise à jour de l'utilisateur dans la base de données
    const result = await User.updateUser(user_id, user);
    if (res === null) {
        return res.status(500).json({ message: "Update failed due to an internal server error" })
    };
    const updated_user = await User.findByUser_id(user_id)
    delete updated_user.password; // supprimer le mot de passe de l'objet new_user
    return res.json(updated_user)
};

exports.updateUserPassword = async (req, res) => {
    const user_id = req.params.user_id;
    const { password } = req.body;

    if(!password){
        return res.status(400).json({ message: "Password is required" })
    }

    const user = await User.findByUser_id(user_id)

    if (!user) {
        return res.status(404).json({ message: "User not found." })
    }

    try {
        await User.updatePassword(user_id, password);
        return res.json({ message: "Password updated successfully" })
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while updating the password" })
    }
}

exports.delete = async (req, res) => {
    // Récupération de l'ID de l'utilisateur
    const { user_id } = req.params;
    //   get the user from the database
    const user = await User.findByUser_id(user_id)
    if (!user) {
        return res.status(404).json({ message: "User not found." })
    }

    // delete the user permissions
    await User_Permissions.deleteByUserId(user_id)

    // Suppression de l'utilisateur de la base de données
    const result = await User.delete(user_id);
    if (res === null) {
        return res.status(500).json({ message: "Delete failed due to an internal server error" })
    }
    return res.json({ message: "User deleted successfully" })
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

exports.getUserInfo = async (user_id) => {
    const user = await User.findByUser_id(user_id)
    // Inject the permissions
    user.permissions = await User_Permissions.findUserPermissionsIds(user.user_id);
    return user
}