require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // check if auth header exists
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const user = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = user.id;
            next();
        } catch (err) {
            return res.status(401).json({ message: "Access Denied: Invalid or Expired Token" });
        }
    }
    else {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }
}