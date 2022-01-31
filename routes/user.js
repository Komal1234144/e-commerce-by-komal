const router = require('express').Router();
const User = require('../models/user');
const {verifyTokenAndAdmin, verifyAndFind} = require('./verify');
const bcrypt = require('bcrypt');


router.put('/:userId' , verifyAndFind, async(req , res )=>{
   try{ 
       if(req.body.password){
           req.body.password = await bcrypt.hash(req.body.password , 8);
       }
       const updatedUser = await User.findByIdAndUpdate(req.params.userId , {
           $set : req.body
       }, {new : true});

       
        res.status(200).send(updatedUser);
   }catch(err){
       res.status(500).send(err);
   }
})

router.delete('/:userId' , verifyAndFind , async(req, res)=>{

    try{
       await User.findByIdAndDelete(req.params.userId);
       res.status(200).send('User successfully deleted')
    }catch(err){
       res.status(500).send(err)
    }
})

router.get('/:userId' , verifyTokenAndAdmin , async(req,res)=>{
    try{
         const user = await User.findById(req.params.userId);
         const {password , ...others} = user._doc;
         res.status(200).send(others)
    }catch(err){
        res.status(500).send(err)
    }
})

router.get('/', verifyTokenAndAdmin, async(req,res )=>{
     const query = req.query.new;
    try{ 
       const users = query ? await User.find({}).sort({_id : -1}).limit(10)
       : await User.find({})
     
      res.status(200).send(users)
    }catch(err){
       res.status(503).send(err);
    }
})

router.get('/stats' , async(req,res)=>{
     let date = new Date();
     let lastyear = new Date(date.setFullYear(date.getFullYear() - 1));
    
    try{
        const data = await User.aggregate([
          { $match : {createdAt : {$gte : lastyear}}},
          { $project : {month : {$month : "$createdAt"}}},
          { $group : {_id : "$month" , total : {$sum : 1}}}
        ])

        res.status(200).json(data)
    }catch(err){
        res.status(503).send(err);
    }
})
module.exports = router;