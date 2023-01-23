const express = require('express');
const db = require('../models');
const User = db.users

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const usernamecheck = await User.findOne({
            where: {
                username: req.body.username
            },
        });
        if (usernamecheck) {
            res.status(409).json('Authentication failed username already taken')
        }
        const emailcheck = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (emailcheck) {
            res.status(409).json('Authentication failed, email already exists')
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    checkDuplicateUsernameOrEmail
};