const express = require('express');
const app = express();
const user_routes=require('./routes/user')
const logger = require('./logger');
const sequelize = require('./db');
const port = 3000; // You can change the port if needed
app.use(express.json());
// Define a route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});



app.use('/api',user_routes)
  
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


