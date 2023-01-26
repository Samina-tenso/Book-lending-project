const jwt = require('jsonwebtoken');
const db = require('../models');
const config = require('../config/auth.config')

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    try {
        let token = await authHeader && authHeader.split('Bearer ')[1]
        console.log(token, "has token")
        if (!token) {
            return res.status(403).send({
                message: 'No token provided'
            });
        }

        jwt.verify(token, config.secret, (error, user) => {

            console.log(config.secret)
            if (error) {
                console.log(error.message)
                return res.status(401).send({
                    message: 'Unauthorized'
                });
            }
            console.log("authed")
            req.user = user
            next();
        });
    } catch (error) {
        console.log(error.message)
    }

};

module.exports = {
    verifyToken
}