const sequelize = require('../connection');
const Sequelize = require('sequelize');
const Users = sequelize.define('users', {
  UserID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Name: Sequelize.STRING,
  Email: Sequelize.STRING,
  Password: Sequelize.STRING,
  Mobile: Sequelize.INTEGER,
  Address: Sequelize.STRING,
}, {
    timestamps: true,
    freezeTableName: true,
    paranoid: true
  });


module.exports = Users;