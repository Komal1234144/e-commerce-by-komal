const router = require('express').Router();
const Cart = require('../models/cart');
const {verifyTokenAndAdmin, verifyAndFind , verifyToken} = require('./verify');

//CREATE CART
router.post('/' , verifyToken , async(req,res)=>{
    try{
       const cart = await new Cart(req.body);
       await cart.save();
       res.status(200).send(cart);
    }catch(err){
        res.status(500).send(err);
    }
})

//UPDATE CART
router.put('/:userId' ,verifyAndFind , async(req , res )=>{
   try{ 
      
       const updatedCart = await Cart.findOneAndUpdate({ userId : req.params.userId} , {
           $set : req.body
       }, {new : true});

       
        res.status(200).send(updatedCart);
   }catch(err){
       res.status(500).send(err);
   }
})

//DELETE FROM CART
router.delete('/:userId' , verifyAndFind , async(req, res)=>{

    try{
       await Cart.findOneAndDelete({userId  : req.params.userId});
       res.status(200).send('Cart successfully deleted')
    }catch(err){
       res.status(500).send(err)
    }
})

//GET CART
router.get('/:userId', verifyAndFind  , async(req,res)=>{
    try{
         const cart = await Cart.findOne({userId : req.params.userId});
         res.status(200).send(cart)
    }catch(err){
        res.status(500).send(err)
    }
})

//GET ALL CARTS
router.get('/', verifyTokenAndAdmin, async(req,res )=>{
     try{
         const carts = Cart.find({});
         res.status(200).send(carts)
     }catch(err){
       res.status(503).send(err);
    }
})


module.exports = router;