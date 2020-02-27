const router=require('express').Router();
const mongoose=require('mongoose');
const User=require('../models/Users');
const Validation=require('../Validate');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const check=new Validation();

router.post('/register', async (req,res)=>{

    //Data validation
    const {error} = check.registerValidation(req.body);

    if(error)  return res.status(400).send(error.details[0].message);

    //Check if email is already in database
    const emailExists = await User.findOne({email:req.body.email});
    if(emailExists){
        return res.status(400).send('Email already exists');
    }
    
    //Hash the password!
    var salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(req.body.password,salt);

    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
    });

    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login',async (req,res)=>{
    
    const {error} = check.loginValidation(req.body);

    if(error)  return res.status(400).send(error.details[0].message);

    //Check if email is already in database
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).send('Email is not registered!');
    }

    //checking hashed password
    var validPass=await bcrypt.compare(req.body.password,user.password);
    if(!validPass){
        return res.status(400).send("Password is incorrect")
    }
    //jwt send token
    var token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET);

    res.header('authToken',token).send(token);

});

module.exports=router;