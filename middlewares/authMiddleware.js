require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // check if auth header exists
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(401).send("Access Denied: Invalid or Expired Token");
            }
            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
}