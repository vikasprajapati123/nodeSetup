const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User =require('./user')

const Photos = sequelize.define('Photos', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true // Specify id as the primary key
  },
  photos: {
    type: DataTypes.STRING
  }
});
Photos.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE', // Optional: Defines what happens when a user is deleted
});

module.exports = Photos;