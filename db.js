require('dotenv').config();
const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT, // Change this to your database dialect (e.g., 'postgres', 'sqlite')
});


sequelize.authenticate()
.then(() => {
  console.log('Connection stable to the database has been established successfully.yahooo');
})
.catch((error) => {
  console.error('Unable to connect to the database:', error);
});


// Export the Sequelize instance to be used in other parts of your application
module.exports = sequelize;


 