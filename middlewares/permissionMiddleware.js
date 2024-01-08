const {resourcePermissions, userPermissions, departementPermissions,modulePermissions} = require('../utils/permissions')
const authController = require('../controllers/authController');

exports.resourceReadPermission = async (req, res, next) => {
    let {user} = req;
    if(!user) return res.sendStatus(401);
    user = await authController.getCurrentUser(user);
    if(!user) return res.sendStatus(401);
    // if it is an admin, then allow it
    if(user.is_admin) return next();
    if(!user.permissions.length) return res.sendStatus(401);
    const permissions = user.permissions.map(item => item.nom);
    if(!permissions.includes(resourcePermissions.read)) return res.sendStatus(403).json({message: 'Access Denied'});
    next();
}
exports.resourceCreatePermission = async (req, res, next) => {
    let {user} = req;
    if(!user) return res.sendStatus(401);
    user = await authController.getCurrentUser(user);
    if(!user) return res.sendStatus(401);
    // if it is an admin, then allow it
    if(user.is_admin) return next();
    if(!user.permissions.length) return res.sendStatus(401);
    const permissions = user.permissions.map(item => item.nom);
    if(!permissions.includes(resourcePermissions.create)) return res.sendStatus(403).json({message: 'Access Denied'});
    next();
}
exports.resourceDeletePermission = async (req, res, next) => {
    let {user} = req;
    if(!user) return res.sendStatus(401);
    user = await authController.getCurrentUser(user);
    if(!user) return res.sendStatus(401);
    // if it is an admin, then allow it
    if(user.is_admin) return next();
    if(!user.permissions.length) return res.sendStatus(401);
    const permissions = user.permissions.map(item => item.nom);
    if(!permissions.includes(resourcePermissions.delete)) return res.sendStatus(403).json({message: 'Access Denied'});
    next();
}
exports.resourceUpdatePermission = async (req, res, next) => {
    let {user} = req;
    if(!user) return res.sendStatus(401);
    user = await authController.getCurrentUser(user);
    if(!user) return res.sendStatus(401);
    // if it is an admin, then allow it
    if(user.is_admin) return next();
    if(!user.permissions.length) return res.sendStatus(401);
    const permissions = user.permissions.map(item => item.nom);
    if(!permissions.includes(resourcePermissions.update)) return res.sendStatus(403).json({message: 'Access Denied'});
    next();
}





exports.userGetPermission = async (req, res, next) => {
    let {user} = req;
    if(!user) return res.sendStatus(401);
    user = await authController.getCurrentUser(user);
    if(!user) return res.sendStatus(401);
    // if it is an admin, then allow it
    if(user.is_admin) return next();
    if(!user.permissions.length) return res.sendStatus(401);
    const permissions = user.permissions.map(item => item.nom);
    if(!permissions.includes(userPermissions.get)) return res.sendStatus(403).json({message: 'Access Denied'});
    next();
}
exports.userCreatePermission = async (req, res, next) => {
    let {user} = req;
    if(!user) return res.sendStatus(401);
    user = await authController.getCurrentUser(user);
    if(!user) return res.sendStatus(401);
    // if it is an admin, then allow it
    if(user.is_admin) return next();
    if(!user.permissions.length) return res.sendStatus(401);
    const permissions = user.permissions.map(item => item.nom);
    if(!permissions.includes(userPermissions.create)) return res.sendStatus(403).json({message: 'Access Denied'});
    next();
}
exports.userDeletePermission = async (req, res, next) => {
    let {user} = req;
    if(!user) return res.sendStatus(401);
    user = await authController.getCurrentUser(user);
    if(!user) return res.sendStatus(401);
    // if it is an admin, then allow it
    if(user.is_admin) return next();
    if(!user.permissions.length) return res.sendStatus(401);
    const permissions = user.permissions.map(item => item.nom);
    if(!permissions.includes(userPermissions.delete)) return res.sendStatus(403).json({message: 'Access Denied'});
    next();
}
exports.userUpdatePermission = async (req, res, next) => {
    let {user} = req;
    if(!user) return res.sendStatus(401);
    user = await authController.getCurrentUser(user);
    if(!user) return res.sendStatus(401);
    // if it is an admin, then allow it
    if(user.is_admin) return next();
    if(!user.permissions.length) return res.sendStatus(401);
    const permissions = user.permissions.map(item => item.nom);
    if(!permissions.includes(userPermissions.update)) return res.sendStatus(403).json({message: 'Access Denied'});
    next();
}




exports.departementCreatePermission = async (req, res, next) => {
    let {user} = req;
    if(!user) return res.sendStatus(401);
    user = await authController.getCurrentUser(user);
    if(!user) return res.sendStatus(401);
    // if it is an admin, then allow it
    if(user.is_admin) return next();
    if(!user.permissions.length) return res.sendStatus(401);
    const permissions = user.permissions.map(item => item.nom);
    if(!permissions.includes(departementPermissions.create)) return res.sendStatus(403).json({message: 'Access Denied'});
    next();
}
exports.departementDeletePermission = async (req, res, next) => {
    let {user} = req;
    if(!user) return res.sendStatus(401);
    user = await authController.getCurrentUser(user);
    if(!user) return res.sendStatus(401);
    // if it is an admin, then allow it
    if(user.is_admin) return next();
    if(!user.permissions.length) return res.sendStatus(401);
    const permissions = user.permissions.map(item => item.nom);
    if(!permissions.includes(departementPermissions.delete)) return res.sendStatus(403).json({message: 'Access Denied'});
    next();
}
exports.departementUpdatePermission = async (req, res, next) => {
    let {user} = req;
    if(!user) return res.sendStatus(401);
    user = await authController.getCurrentUser(user);
    if(!user) return res.sendStatus(401);
    // if it is an admin, then allow it
    if(user.is_admin) return next();
    if(!user.permissions.length) return res.sendStatus(401);
    const permissions = user.permissions.map(item => item.nom);
    if(!permissions.includes(departementPermissions.update)) return res.sendStatus(403).json({message: 'Access Denied'});
    next();
}
exports.departementGetPermission = async (req, res, next) => {
    let {user} = req;
    if(!user) return res.sendStatus(401);
    user = await authController.getCurrentUser(user);
    if(!user) return res.sendStatus(401);
    // if it is an admin, then allow it
    if(user.is_admin) return next();
    if(!user.permissions.length) return res.sendStatus(401);
    const permissions = user.permissions.map(item => item.nom);
    if(!permissions.includes(departementPermissions.get)) return res.sendStatus(403).json({message: 'Access Denied'});
    next();
}

exports.modulesGetPermission = async (req, res, next) => {
    let {user} = req;
    if(!user) return res.sendStatus(401);
    user = await authController.getCurrentUser(user);
    if(!user) return res.sendStatus(401);
    // if it is an admin, then allow it
    if(user.is_admin) return next();
    if(!user.permissions.length) return res.sendStatus(401);
    const permissions = user.permissions.map(item => item.nom);
    if(!permissions.includes(modulePermissions.get)) return res.sendStatus(403).json({message: 'Access Denied'});
    next();
}

exports.modulesCreatePermission = async (req, res, next) => {
    let {user} = req;
    if(!user) return res.sendStatus(401);
    user = await authController.getCurrentUser(user);
    if(!user) return res.sendStatus(401);
    // if it is an admin, then allow it
    if(user.is_admin) return next();
    if(!user.permissions.length) return res.sendStatus(401);
    const permissions = user.permissions.map(item => item.nom);
    if(!permissions.includes(modulePermissions.create)) return res.sendStatus(403).json({message: 'Access Denied'});
    next();
}

exports.modulesUpdatePermission = async (req, res, next) => {
    let {user} = req;
    if(!user) return res.sendStatus(401);
    user = await authController.getCurrentUser(user);
    if(!user) return res.sendStatus(401);
    // if it is an admin, then allow it
    if(user.is_admin) return next();
    if(!user.permissions.length) return res.sendStatus(401);
    const permissions = user.permissions.map(item => item.nom);
    if(!permissions.includes(modulePermissions.update)) return res.sendStatus(403).json({message: 'Access Denied'});
    next();
}

exports.modulesDeletePermission = async (req, res, next) => {
    let {user} = req;
    if(!user) return res.sendStatus(401);
    user = await authController.getCurrentUser(user);
    if(!user) return res.sendStatus(401);
    // if it is an admin, then allow it
    if(user.is_admin) return next();
    if(!user.permissions.length) return res.sendStatus(401);
    const permissions = user.permissions.map(item => item.nom);
    if(!permissions.includes(modulePermissions.delete)) return res.sendStatus(403).json({message: 'Access Denied'});
    next();
}