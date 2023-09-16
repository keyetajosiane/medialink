const {resourcePermissions} = require('../utils/permissions')
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