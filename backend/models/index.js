'use strict';
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  })
};


sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
})

db.users = require('../models/user.model.js')(sequelize, Sequelize)
db.books = require('../models/book.model.js')(sequelize, Sequelize)
db.userBooks = require('../models/userBook.model.js')(sequelize, Sequelize)
db.application = require('../models/application.model.js')(sequelize, Sequelize)
//userBook table
db.users.belongsToMany(db.books, { through: db.userBooks, foreignKey: 'user_id', as: "books" })
db.books.belongsToMany(db.users, { through: db.userBooks, foreignKey: 'book_id', as: "users" })

// db.users.hasMany(db.userBooks)
// db.userBooks.belongsTo(db.users)
db.books.hasMany(db.userBooks, { foreignKey: 'id' })
db.userBooks.belongsTo(db.books, { foreignKey: 'book_id' })

//application table
// db.users.belongsToMany(db.books, { through: applicationModel, foreignKey: 'user_id', as: "books" })
// db.books.belongsToMany(db.users, { through: applicationModel, foreignKey: 'book_id', as: "users" })
// db.users.belongsToMany(db.users, { through: applicationModel, foreignKey: 'lender_id', otherKey: 'lendee_id', as: "lender" })
// db.users.belongsToMany(db.users, { through: applicationModel, foreignKey: 'lendee_id', otherKey: 'lender_id', as: "lendee" })

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
