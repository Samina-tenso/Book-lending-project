const jwt = require('jsonwebtoken');
const db = require('../models');
const config = require('../config/auth.config')

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    try {

        let token = await authHeader && authHeader.split('Bearer ')[1]
        console.log(typeof token)
        if (!token) {

            console.log(token)
            console.log("hl")
            return res.status(403).send({
                message: 'No token provided'
            });

        }
        jwt.verify(token, config.secret, (err, user) => {
            console.log(config.secret)
            if (err) {
                console.log(err.message)
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