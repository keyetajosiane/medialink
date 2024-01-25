const apprenant = require('../models/apprenantModels');
const departement = require('../models/departementModels');
const userModel = require('../models/userModels');
const userController = require('./userController');
const userPermissionsController = require('./userPermissionsController');
const authController = require('./authController');


exports.getAll = async (req, res) => {
    const _apprenants = await apprenant.findAll();
    // inject the user
    if (_apprenants) {
        for (let i = 0; i < _apprenants.length; i++) {
            const user = await userController.getUserInfo(_apprenants[i].user_id);
            _apprenants[i] = { ..._apprenants[i], ...user };
        }
    }
    // inject the modules
    res.json(_apprenants);
};
exports.insert = async (req, res) => {
    const create_data = req.body;
    const _auth_user = await authController.getCurrentUser(req.user);
    // check if the matricule is unique
    if(!create_data.matricule){
        res.status(400).json({ message: "matricule is required" });
        return;
    }
    let _apprenant = await apprenant.findByMatricule(create_data.matricule)
    if (_apprenant) {
        res.status(409).json({ message: "matricule already exist" });
        return;
    }
    // check if departement exist
    let departement_id = create_data.departement_id;
    if (departement_id) {
        let _departement = await departement.findByDepartement_id(departement_id)
        if (_departement === null) {
            res.status(404).json({ message: "departement not found" });
            return;
        }
    }
    else {
        res.status(400).json({ message: "departement is required" });
        return;
    }

    // first create the user
    userController.create(req, res, async (userCreationResult) => {
        // check if status is 201
        if (userCreationResult.status !== 201) {
            res.status(userCreationResult.status).json({ message: userCreationResult.message });
            return;
        }
        const user = userCreationResult.user;
        create_data['user_id'] = user.user_id;
        create_data['created_by'] = _auth_user.user_id;
    
        const result = await apprenant.insert(create_data)
        if (result === false) {
            res.status(500).json({ message: "Unable to create this  apprenant due to an internal server error" });
            return;
        }
        // return the new user
        let new_apprenant = await apprenant.findById(result);
        new_apprenant = { ...new_apprenant, ...user };
        return res.status(201).json(new_apprenant);

    });
};
exports.getapprenantById = async (req, res) => {
    // Récupération de l'ID de l'apprenant
    const { apprenant_id } = req.params;
    // Recherche de l'utilisateur par ID
    let _apprenant = await apprenant.findById(apprenant_id);
    // inject the user
    if (_apprenant) {
        const user = await userController.getUserInfo(_apprenant.user_id);
        _apprenant = { ..._apprenant, ...user };
    }
    // Envoi de la réponse au format JSON
    res.json(_apprenant);
};

exports.getByUserId = async (req, res) => {
    // Récupération de l'ID de l'apprenant
    const { user_id } = req.params;
    // Recherche de l'utilisateur par ID
    let _apprenant = await apprenant.findByUserId(user_id);
    // inject the user
    if (_apprenant) {
        const user = await userController.getUserInfo(user_id);
        _apprenant = { ..._apprenant, ...user };
    }
    // Envoi de la réponse au format JSON
    res.json(_apprenant);
}

exports.getApprenantByMatricule = async (req, res) => {
    // Récupération de l'ID de la ressource
    const { matricule } = req.params;
    // Recherche de l'utilisateur par ID
    let _apprenant = await apprenant.findByMatricule(matricule);
    // inject the user
    if (user) {
        const user = await userController.getUserInfo(user.user_id);
        _apprenant = { ..._apprenant, ...user };
    }
    // Envoi de la réponse au format JSON
    res.json(_apprenant);
};

exports.updateApprenant = async (req, res) => {
    // Récupération de l'ID du departement
    const { apprenant_id } = req.params;
    // Récupération des données du formulaire
    const apprenant_update_data = req.body;
    // get the departement from the database
    const _apprenant = await apprenant.findById(apprenant_id)   // if the user does not exist, throw an error
    if (!_apprenant) {
        return res.status(404).json({ message: "appprenant not found." })
    };
    // update the user table
    const user_update_data = {
        first_name: apprenant_update_data.first_name,
        last_name: apprenant_update_data.last_name,
        email: apprenant_update_data.email,
        user_name: apprenant_update_data.user_name,
        role: apprenant_update_data.role,
        is_admin: apprenant_update_data.is_admin
    }
    const updated_user = userModel.updateUser(_apprenant.user_id, user_update_data);
    if (updated_user === null) {
        return res.status(500).json({ message: "User info update failed due to an internal server error" })
    }
    // update the apprenant permissions
    const updated = await userPermissionsController.updateUserPermissions(_apprenant.user_id, apprenant_update_data.permissions);
    if(!updated){
        return res.status(500).json({ message: "Update failed, could not update permissions" })
    }

    // Update the apprenant in the database
    update_data = {
        matricule: apprenant_update_data.matricule,
        user_id: apprenant_update_data.user_id,
        departement_id: apprenant_update_data.departement_id
    }
    const result = await apprenant.updateApprenant(apprenant_id, update_data);
    if (result === null) {
        return res.status(500).json({ message: "Apprenant update failed due to an internal server error" })
    }
    const updated_apprenant = await apprenant.findById(apprenant_id)

    return res.json(updated_apprenant)
};
exports.updateMatricule = async (req, res) => {
    const { apprenant_id, matricule } = req.body; // Extraction des données de la requête
    const _apprenant = await apprenant.updateMatricule(apprenant_id, matricule); // Appel de la méthode updateNom_departement de la classe Departement
    if (res === null) {
        throw new Error("Update matricule failed due to an internal server error")
    }
    return res.json(_apprenant)
}
exports.delete = async (req, res) => {
    // Récupération de l'ID de la permission
    const { apprenant_id } = req.params;
    //   get the user from the database
    const _apprenant = await apprenant.findById(apprenant_id)
    if (!_apprenant) {
        return res.status(404).json({ message: "apprenant not found." })
    }
    // Suppression du departement de la base de données
    const result = await apprenant.delete(apprenant_id);
    if (res === null) {
        return res.status(500).json({ message: "Delete failed due to an internal server error" })
    }
    return res.json({ message: "apprenant deleted successfully" })
};

exports.deleteByMatricule = async (req, res) => {
    // Récupération de l'ID du departement
    const { matricule } = req.params;
    //   get the user from the database
    const _apprenant = await apprenant.findByMatricule(matricule)
    if (!_apprenant) {
        return res.status(404).json({ message: "apprenant not found." })
    }
    // Suppression du departement de la base de données
    const result = await apprenant.deleteByMatricule(matricule);
    if (res === null) {
        return res.status(500).json({ message: "Delete failed due to an internal server error" })
    }
    return res.json({ message: "apprenant deleted successfully" })
};


exports.count = async (req, res) => {
    const c_apprenant = await apprenant.count();
    if (c_apprenant === null) {
        // renvoyer 0 si le résultat est null
        res.json(0);
    } else if (typeof c_apprenant !== 'number') {
        // lancer une erreur si le résultat n'est pas un nombre
        return res.status(500).json({ message: 'Résultat invalide' });
    } else {
        // renvoyer le résultat en JSON
        res.json(c_apprenant);
    }
};

