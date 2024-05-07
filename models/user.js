
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Photo = require('./photos'); // Import the Photo model

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING
  }
});

User.hasMany(Photo, { foreignKey: 'user_id' }); // Use 'foreignKey' instead of 'id' to specify the foreign key
Photo.belongsTo(User, { foreignKey: 'user_id',as:"userPhotos" }); 
module.exports = User;
