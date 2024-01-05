const User = require('../models/userModels');
const User_Permissions = require('../models/userPermissionsModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Log in a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the login is successful.
 */
exports.login = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await User.findByUser_nameOrEmail(username);
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    // remove password
    user.password = undefined;
    // populate user permissions
    const permissions = await User_Permissions.userPermissionsDetails(user.user_id);
    user.permissions = permissions
    res.status(200).json({ token, user });
}

exports.refresh = async (req, res) => {
    const {user_id} = req.user;
    const user = await User.findByUser_id(user_id);
    const permissions = await User_Permissions.userPermissionsDetails(user.user_id);
    user.permissions = permissions
    return user
}

exports.getCurrentUser = async (username) => {
    if(!username) return null;
    const user = await User.findByUser_nameOrEmail(username);
    const permissions = await User_Permissions.userPermissionsDetails(user.user_id);
    user.permissions = permissions
    return user
}
