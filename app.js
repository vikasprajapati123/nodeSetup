const express = require('express');
const app = express();
const user_routes=require('./routes/user');
const logger = require('./logger');
const sequelize = require('./db');
const bodyParser = require('body-parser');
const fileUpload =require('express-fileupload')
app.use(fileUpload());
app.use(express.json());
const port = 3000; // You can change the port if needed
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Define a route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});



app.use('/api',user_routes);
  
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


