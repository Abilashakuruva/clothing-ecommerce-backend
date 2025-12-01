const express=require("express");
const dotEnv=require('dotenv');
const mongoose=require('mongoose');
const authRoutes=require("./routes/authRoutes")
const productRoutes=require("./routes/productRoutes");
const cartRoutes=require("./routes/cartRoutes");
const orderRoutes=require("./routes/orderRoutes")


const cookieParser=require('cookie-parser');

const path=require('path');
const cors=require('cors');

const app=express()

const PORT=process.env.PORT || 4000;

dotEnv.config();
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("MONGODB connected successfully!"))
    .catch((error)=>console.log(error))

    app.use(express.json());
    app.use(cookieParser());
    app.use('/auth',authRoutes);
    app.use('/product',productRoutes);
    app.use('/cart',cartRoutes);
    app.use('/order',orderRoutes);
    app.use("/images", express.static("images"));



app.listen(PORT,()=>{
    console.log(`Server started and running at ${PORT}`);

});
app.use('/',(req,res)=>{
    res.send("<h1>Welcome to clothing-ecommerce");
})