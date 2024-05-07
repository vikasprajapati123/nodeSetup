const { DataTypes ,Model} = require('sequelize');
const  User  = require('./user');
const sequelize = require('../db');
 // Import the User model

const Photos = sequelize.define('Photos', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  photos: {
    type: DataTypes.STRING
  }
});



module.exports = Photos;

