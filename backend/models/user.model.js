
const { Sequelize } = require('sequelize');
//Datatypes ex. STRING etc.
//sequelize instance of database
module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: { notEmpty: true, isEmail: true }
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: { notEmpty: true, }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: { notEmpty: true, }
        }
    });
    return User;
};