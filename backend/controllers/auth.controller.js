const db = require('../models');
const jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
const config = require('../config/auth.config')
const User = db.users;
const signup = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: "send both email and password"
        })
        return
    };
    try {
        //create user
        const data = {
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hashSync(req.body.password, 8)
        };
        //save user to database 
        const user = await User.create(data)
        if (user) {
            //jwt.sign
            let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400//24 hr
            })
            res.status(201).send({
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token
            })
        } else {
            console.log(error.message)
            res.status(409).send({
                message: err.message || " Some error occured when registering user"
            });
        }
    } catch (error) {
        console.log(error)
    };
};

const signin = async (req, res) => {
    try {
        //find user in database
        const { email, password, } = req.body;
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            return res.status(404).send({ message: "User not found" })
        }
        const isSame = await bcrypt.compare(password, user.password);
        //if password is same generate token with user's id and the secretKey in env file
        if (isSame) {
            let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400//24 hr
            })
            return res.status(201).send({
                id: user.id,
                username: user.username,
                email: email,
                accessToken: token
            })
        } return res.status(401).send({
            accessToken: null,
            message: 'Invalid Password!'
        });
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    signup,
    signin,
}


