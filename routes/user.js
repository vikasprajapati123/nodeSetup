const express=require('express')
const router=express.Router();
const app=express();
const {getUsers,createUsers,sendMail,Login,getData,UpdatedLogin,deleteUser}=require('../Controllers/UserController')
const verifyToken=require('../middleware')
router.get("/check",(req,res)=>{
    res.send({
        data:"Here is your data"
    });
})
router.get('/getData', verifyToken, getData);
router.get('/getUser',getUsers);
router.post('/createUser',createUsers);
router.get('/sendMail',sendMail);
router.post('/login',Login);
router.post('/login',Login);
router.post('/update/:id', UpdatedLogin);
router.post('/delete/:id', deleteUser);

module.exports=router