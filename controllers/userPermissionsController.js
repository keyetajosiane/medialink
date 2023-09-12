const User_Permissions = require('../models/userPermissionsModel');
const User = require("../models/userModels");

exports.updateUserPermissions = async (req, res) => {
    const { user_id } = req.params
    const permissions = req.body;
    if (user_id) {
        return res.status(400).json({message: "user id is required"})
    }
    // check if user exists
    const user = await User.findByUser_id(user_id)
    if (!user) {
        return res.status(404).json({message: "user not found"})
    }
    // get all current user permissions
    const current_permissions = await User_Permissions.findUserPermissionsIds(user_id)
    const new_permissions = []
    if(current_permissions === null) new_permissions = permissions
    else {
        // delete old permissions that are not in incoming permissions
        for(let permission_id of current_permissions){
            if (!permissions.includes(permission_id)){
                await User_Permissions.deleteByPermissionsId(permission_id)
            }
        }

        // filter new permissions
        for(let permission_id of permissions){
            if (!current_permissions.includes(permission_id)){
                new_permissions.push(permission_id)
            }
        }
    }
    // insert new user permissions
    for(let permission_id of new_permissions){
        await User_Permissions.insert({user_id, permission_id})
    }
    return res.json({message: "user permissions updated"})
}