const {resourcePermissions, userPermissions, departementPermissions} = require('../utils/permissions')
const authController = require('../controllers/authController');

exports.resourceReadPermission = async (req, res, next) => {
    let {user} = req;
    if(!user) return res.sendStatus(401);
    user = await authController.getCurrentUser(user);
    if(!user) return res.sendStatus(401);
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
    if(!user.permissions.length) return res.sendStatus(401);
    const permissions = user.permissions.map(item => item.nom);
    if(!permissions.includes(departementPermissions.get)) return res.sendStatus(403).json({message: 'Access Denied'});
    next();
}