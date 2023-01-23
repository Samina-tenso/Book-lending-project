
const { Sequelize } = require('sequelize');
//Datatypes ex. STRING etc.
//sequelize instance of database
module.exports = (sequelize) => {
    const Book = sequelize.define('book', {
        id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        isbnNo: {
            allowNull: false,
            type: Sequelize.STRING,
            allowNull: false,
            validate: { notEmpty: true, }
        },
        genre: {
            type: Sequelize.ENUM,
            values: [
                'Tragedy',
                'Adventure',
                'Fiction',
                'Fable',
                'Mystery',
                'Mythology',
                'Biography',
                'Memoir',
                'Essay',
                'Textbook',
                'Fantasy'
            ], defaultValue: 'Essay',
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: { notEmpty: true, }
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: { notEmpty: true, }
        },
        image: {
            type: Sequelize.STRING,
        }
    });
    return Book;
};