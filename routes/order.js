const router = require('express').Router();
const Order = require('../models/order');
const {verifyTokenAndAdmin, verifyAndFind , verifyToken} = require('./verify');

//CREATE ORDER
router.post('/' , verifyAndFind , async(req,res)=>{
    try{
       const order = await new Order(req.body);
       await order.save();
       res.status(200).send(order);
    }catch(err){
        res.status(500).send(err);
    }
})

//UPDATE ORDER
router.put('/:userId' , verifyTokenAndAdmin , async(req , res )=>{
   try{ 
      
       const updatedOrder = await Order.findOneAndUpdate({ userId : req.params.userId} , {
           $set : req.body
       }, {new : true});

       
        res.status(200).send(updatedOrder);
   }catch(err){
       res.status(500).send(err);
   }
})

//DELETE ORDER
router.delete('/:userId' , verifyTokenAndAdmin , async(req, res)=>{

    try{
       await Order.findOneAndDelete({userId  : req.params.userId});
       res.status(200).send('Order successfully deleted')
    }catch(err){
       res.status(500).send(err)
    }
})

//GET ORDER
router.get('/:userId', verifyAndFind  , async(req,res)=>{
    try{
         const order = await Order.find({userId : req.params.userId});
         res.status(200).send(order)
    }catch(err){
        res.status(500).send(err)
    }
})

//GET ALL ORDERS
router.get('/', verifyTokenAndAdmin, async(req,res )=>{
     try{
         const orders = await Order.find({});
         res.status(200).send(orders)
     }catch(err){
       res.status(500).send(err);
    }
})

// GET INCOME
router.get('/find/income' , verifyTokenAndAdmin , async(req,res)=>{
    
    const date = new Date();
    const lastmonth = new Date(date.setMonth(date.getMonth()-1))
    const previousmonth = new Date(date.setMonth(lastmonth.getMonth()-1))
   
    try{  
       const income = await Order.aggregate([
           {$match : {createdAt : {$gte : previousmonth}}},
           {$project : {month : {$month : "$createdAt"} , sales : "$amount"}},
           {$group : {_id : "$month" , total : {$sum : "$sales"}}}
       ]);
      
       res.status(200).send(income)
    }catch(err){
        res.status(500).send(err);
    } 
})

module.exports = router;