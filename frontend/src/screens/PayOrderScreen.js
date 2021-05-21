import React, { useEffect, useState } from 'react'
import {PayPalButton} from "react-paypal-button-v2"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrderDetail, payOrder } from '../actions/orderActions'
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'
import axios from 'axios'
import { PAY_ORDER_RESET } from '../constants/orderConstants'


function PayOrderScreen(props) {
    const orderId=props.match.params.id;
    const orderDetail = useSelector(state => state.orderDetail)
    const {loading,error,order}=orderDetail
    const [sdkReady,setSdkReady]=useState(false);
    const {payLoading, payError, paySuccess}= useSelector(state=>state.payOrder)
    const dispatch = useDispatch()
    useEffect(()=>{
        const addPaypalScript=async()=>{
            const {data}= await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type='text/javascript'
            script.src=`https://www.paypal.com/sdk/js?client-id=${data}`
            script.async="true"
            script.onload=()=>{setSdkReady(true)};
            document.body.appendChild(script);
        }
        if(!order || paySuccess){
            dispatch({type:PAY_ORDER_RESET})
            dispatch(getOrderDetail(orderId))
        }else{
            if(!order.paid){
                if(!window.paypal)
                addPaypalScript();
                else setSdkReady(true);
            }
        }
    },[orderId,dispatch])
    const successHandler=(paymentResult)=>{
        dispatch(payOrder(order,paymentResult));
    }
    return loading?<LoadingBox></LoadingBox>:
        error?<MessageBox>{error}</MessageBox>:(
        <div>
            <h2>Order ID {order._id}</h2>
            <div className="row top">
            <div className="col-2">
                <div className="card card-body">
                    <h2>Shipping</h2>
                    <p>
                        <strong>Name:</strong> {order.shippingAddress.fullName} <br></br>
                        <strong>Address:</strong>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                    </p>
                    {order.isDelivered? <MessageBox>Order Delivered</MessageBox> : <MessageBox>Order Not Delivered</MessageBox>}
                </div>
                <div className="card card-body">
                    <h2>Payment</h2>
                    <p>
                        <strong>Method:</strong>{order.paymentMethod}
                    </p>
                    {order.isPaid? <MessageBox>Payment Done</MessageBox>: <MessageBox>Payment Pending</MessageBox>}
                </div>
                <div className="card card-body">
                    <h2>Order Items</h2>
                    <ul>
                    {order.orderItems.map(item => (
                        <li key={item.product}>
                            <div className="row">
                                <div>
                                    <img src={item.image} alt={item.name} className="small" />
                                </div>
                                <div className="min-20">
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </div>
                                <div>
                                    {item.price} x {item.qty} = Rs.{item.price*item.qty}
                                </div>
                            </div>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>Order Summary</h2>
                        </li>
                        <li>
                            <div className="row">
                            <div>Items Price:</div>
                            <div>Rs.{order.itemsPrice}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Shipping Price:</div>
                                <div>Rs.{order.shippingPrice}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Tax Price:</div>
                                <div>Rs.{order.taxPrice}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div><strong>Total:</strong></div>
                                <div><strong>Rs.{order.totalPrice}</strong></div>
                            </div>
                        </li> 
                        {!order.isPaid && (sdkReady?
                        <>
                        {payError && <MessageBox>{payError}</MessageBox>}
                        {payLoading && <LoadingBox></LoadingBox>}
                        <li><PayPalButton amout={order.totalPrice} onSuccess={successHandler}></PayPalButton></li>
                        </>
                        :<LoadingBox></LoadingBox>)}
                    </ul>
                </div>
            </div>
            </div>
        </div>
    )
}

export default PayOrderScreen
