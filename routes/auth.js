const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uniqid = require('uniqid');


//REGISTER ROUTE
router.post('/register'  ,  async(req, res)=>{

   const hashedPassword = await bcrypt.hash(req.body.password , 8);
   try{ 
   const newUser = await new User({
      
       username : req.body.username,
       email : req.body.email,
       password : hashedPassword
   });
   
  
      const savedUser = await newUser.save();
      res.status(201).send(savedUser)
   }catch(err){
      res.status(503).send(err)
   }
})

//LOGIN ROUTE

router.post('/login', async(req,res)=>{
   
    try{
    const user = await User.findOne({username : req.body.username});
    if(!user){
       return res.status(401).send('Wrong username');      
    }
   
    
    const isMatch = await bcrypt.compare(req.body.password , user.password);
    if(!isMatch){
       return res.status(402).send('Wrong password');
    }
  
    
    const token = await jwt.sign({id : user._id , isAdmin : user.isAdmin }, process.env.SEC_KEY, {expiresIn : '3 days'} );
    const {password , ...others} = user._doc;
    res.status(200).send({...others , token})
    }catch(err){
       res.status(503).send(err);   
    }
;})

module.exports = router;