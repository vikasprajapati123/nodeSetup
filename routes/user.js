const express=require('express')
const router=express.Router();
const {getUsers,createUsers,sendMail}=require('../Controllers/UserController')


router.get("/check",(req,res)=>{
    res.send({
        data:"Here is your data"
    });
})

router.get('/getUser',getUsers);
router.post('/createUser',createUsers);
router.get('/sendMail',sendMail);


module.exports=router