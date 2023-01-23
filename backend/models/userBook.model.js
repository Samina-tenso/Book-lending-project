const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    const UserBook = sequelize.define('userBook', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
        },
        book_id: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.ENUM,
            values: [
                'AV',
                'NA'
            ], defaultValue: 'AV'
        }
    });
    return UserBook;
}; 