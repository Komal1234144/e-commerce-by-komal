const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRouter = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const stripeRoutes = require('./routes/stripe');
const cors = require('cors');

app.use(cors());
dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('db connection successful')
}).catch((err)=>{
    console.log(err)
})

// app.use((req, res, next) => {
//     res.header({"Access-Control-Allow-Origin": "*"});
//     next();
//   }) 

app.use('/api/auth' , authRoutes);
app.use( '/api/users' , userRoutes)
app.use('/api/products' , productRouter);
app.use('/api/cart' , cartRoutes);
app.use('/api/orders' , orderRoutes);
app.use('/api/checkout' , stripeRoutes);

const port  = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname , "/e-commerceClient/build")));

app.get('*' , (req , res)=>{
    res.sendFile(path.join(__dirname , '/e-commerceClient/build' , 'index.html'))
})

app.listen(port , ()=>{
    console.log(`server is up on port ${port}`)
})