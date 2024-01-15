const User_Permissions = require('../models/userPermissionsModel');
const User = require("../models/userModels");

exports.updateUserPermissions = async (user_id, permissions) => {
    if (!user_id) {

        return false
    }
    // check if user exists
    const user = await User.findByUser_id(user_id)
    if (!user) {
        console.log("User not found when updating permissions");
        return false
    }
    // get all current user permissions
    let current_permissions = await User_Permissions.findUserPermissionsIds(user_id)

    const new_permissions = []
    if(current_permissions === null) new_permissions = permissions
    else {
        // if no change in permissions, then return true
        if (current_permissions === permissions) return true
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
    for(let permissions_id of new_permissions){
        await User_Permissions.insert({user_id, permissions_id})
    }
    return true
}