const router = require('express').Router();
const Product = require('../models/product');
const {verifyTokenAndAdmin, verifyAndFind} = require('./verify');

//CREATE PRODUCT
router.post('/' , verifyTokenAndAdmin , async(req,res)=>{
    try{
       const product = await new Product(req.body);
       await product.save();
       res.status(200).send(product);
    }catch(err){
        res.status(500).send(err);
    }
})

//UPDATE PRODUCT
router.put('/:id' ,verifyTokenAndAdmin , async(req , res )=>{
   try{ 
      
       const updatedProduct = await Product.findByIdAndUpdate(req.params.id , {
           $set : req.body
       }, {new : true});

       
        res.status(200).send(updatedProduct);
   }catch(err){
       res.status(500).send(err);
   }
})

//DELETE PRODUCT
router.delete('/:id' , verifyTokenAndAdmin , async(req, res)=>{

    try{
       await Product.findByIdAndDelete(req.params.id);
       res.status(200).send('Product successfully deleted')
    }catch(err){
       res.status(500).send(err)
    }
})

//GET PRODUCT
router.get('/:id'  , async(req,res)=>{
    try{
         const product = await Product.findById(req.params.id);
         res.status(200).send(product)
    }catch(err){
        res.status(500).send(err)
    }
})

//GET PRODUCTS
router.get('/',  async(req,res )=>{
     const Newquery = req.query.new;
     const CategoryQuery = req.query.category;
     let products;
     try{ 
      if(Newquery){
          products = await Product.find().sort({createdAt : -1}).limit(1);
      }else if(CategoryQuery){
          products = await Product.find({category : {$in : [CategoryQuery]}}) 
      }else{
          products = await Product.find({});
      }
     
      res.status(200).send(products)
    }catch(err){
       res.status(503).send(err);
    }
})


module.exports = router;