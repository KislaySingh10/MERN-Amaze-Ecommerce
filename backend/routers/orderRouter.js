import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter=express.Router();

orderRouter.post('/',isAuth ,expressAsyncHandler(async(req,res)=>{
    if(req.body.orderItems.length===0)
        res.status(400).send({message:"Cart is empty."});
    else {
        const order= new Order({
            orderItems:req.body.orderItems,
            shippingAddress:req.body.shippingAddress,
            paymentMethod:req.body.paymentMethod,
            itemsPrice:req.body.itemsPrice,
            shippingPrice:req.body.shippingPrice,
            taxPrice:req.body.taxPrice,
            totalPrice:req.body.taxPrice,
            user:req.user._id
        });
        const createdOrder=await order.save();
        console.log(createdOrder)
        res.status(201).send({message:"New Order Created",order:createdOrder});
    }
}))

orderRouter.get('/mine',isAuth,expressAsyncHandler(async(req,res)=>{
    const orderList=await Order.find({user:req.user._id})
    res.send(orderList)
}))


orderRouter.get('/:id',isAuth,expressAsyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order)
        res.send(order);
    else res.status(401).send({message:"Order Not Found"})
}))

orderRouter.put('/:id/paid',isAuth,expressAsyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id);
    if(order){
        order.isPaid=true;
        order.paid=Date.now();
        order.paymentResult={id:req.body.id, status:req.body.status, email_address:req.body.email_address, update_time:req.body.update_time }
        const updatedOrder= await order.save()
        res.send(updatedOrder);
    }else res.status(401).send({message:"Order Not Found"})
}))


export default orderRouter