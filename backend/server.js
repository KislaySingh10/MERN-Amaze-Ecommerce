import express from 'express';
import  Mongoose  from 'mongoose';
import dotenv from "dotenv";
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';

dotenv.config();

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

Mongoose.connect("mongodb://localhost/amaze",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})




app.use("/api/products",productRouter);

app.use("/api/users",userRouter);
app.use('/api/orders',orderRouter);
app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})
app.get("/",(req,res)=>{
    res.send("Server started at port 5000")
})

app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})
app.listen(5000);
