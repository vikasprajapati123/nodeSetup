const User = require('../models/User');
const nodemailer = require('nodemailer');

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createUsers = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, gender } = req.body;
        console.log(User); // 
        const newUser = await Usercreate({ name, email, gender });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const sendMail = async(req,res)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
              user: process.env.DB_EMAIL,
              pass: process.env.DB_PASSWORD,
            },
            logger: true,
        });
        const mailOptions = {
            from: 'vikas1702060@gmail.com',
            to: 'vikas1702060@gmail.com',
            subject: 'Testing Nodemailer',
            text: 'Hello from Nodemailer!',
            html: '<h1>Hello from Nodemailer!</h1>',
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
            } else {
              console.log('Email sent:', info.response);
            }
        });
        res.status(200).json({ message: 'Email sent successfully' });
    }
    catch(error){
        console.error('Error sending email:', error);
    }
};


  


module.exports = {
    getUsers,
    createUsers,
    sendMail
};
