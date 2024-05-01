const User = require('../models/user');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const validatorMethod =require('../validation');

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
        const { name, email, gender } = req.body; 
        const rules = {
            name: {
                required: true
            },
            email: {
                required: true,
                min: 10
            }
        };
        const emailExists = await User.findOne({where :{email:email}});
        const validationErrors =  await validatorMethod.validateData(rules,req.body);
        if(emailExists){
            const customError = {
                email: 'Email already exists. Please use a different email address.'
            };
            const updatedErrors = { ...validationErrors, ...customError };

            // Respond with a 409 status code and the updated errors
            return res.status(409).json({ errors: updatedErrors });
        }
        
        if(Object.keys(validationErrors).length>0){
            res.status(500).json({ errors:validationErrors });
        }else{
           
            const newUser = await User.create({ name, email, gender });
            const token = generateToken(newUser);
            res.status(201).json({"user":newUser,'token':token});
        }

       
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

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const Login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user = await User.findOne({ where: { email: email } });
        console.log("emailllllllllllllllllllll",user);
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user.id, username: user.email,name:user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
    catch(error){
        res.status(500).json({ "error":error });
    } 
};

const getData=async(req,res)=>{
    const user=req.user;
    res.status(200).json({"user":user});
}
  



  


module.exports = {
    getUsers,
    createUsers,
    sendMail,
    Login,
    getData
};
