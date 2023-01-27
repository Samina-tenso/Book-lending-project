const { Sequelize } = require('sequelize');
module.exports = (sequelize) => {
    const Application = sequelize.define('application', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        lender_id: {
            type: Sequelize.INTEGER,
        },
        lendee_id: {
            type: Sequelize.INTEGER,
        },
        book_id: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.ENUM,
            values: [
                'Requested',
                'Approved',
                'Receieved',
                'Lost',
                'Denied',
                'Returned'
            ], defaultValue: 'Requested',
        }
    });
    return Application
}; 