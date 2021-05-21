import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { placeOrder } from '../actions/orderActions'
import CheckOutSteps from '../components/CheckOutSteps'
import { PLACE_ORDER_RESET } from '../constants/orderConstants'
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'


function PlaceOrderScreen(props) {
    const cart = useSelector(state => state.cart)
    if(!cart.paymentMethod)
        props.history.push("/payment")
    cart.itemsPrice= cart.cartItems.reduce((a,c)=>a+c.qty*c.price,0);
    cart.shippingPrice= cart.itemsPrice>200?25:0;
    cart.taxPrice=0.15*cart.itemsPrice;
    cart.totalPrice=cart.itemsPrice+cart.taxPrice+cart.shippingPrice;
    const createdOrder=useSelector(state=>state.placeOrder)
    const {loading,success,error,order}=createdOrder
    const dispatch = useDispatch()
    const placeOrderHandler=()=>{
        dispatch(placeOrder({...cart,orderItems:cart.cartItems}))
    }
    useEffect(()=>{
        if(success){
            props.history.push(`/orders/${order._id}`)
            dispatch({type:PLACE_ORDER_RESET})
        }
    },[success,order,props.history,dispatch])
    return (
        <div>
            <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
            <div className="row top">
            <div className="col-2">
                <div className="card card-body">
                    <h2>Shipping</h2>
                    <p>
                        <strong>Name:</strong> {cart.shippingAddress.fullName} <br></br>
                        <strong>Address:</strong>{cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                    </p>
                </div>
                <div className="card card-body">
                    <h2>Payment</h2>
                    <p>
                        <strong>Method:</strong>{cart.paymentMethod}
                    </p>
                </div>
                <div className="card card-body">
                    <h2>Order Items</h2>
                    <ul>
                    {cart.cartItems.map(item => (
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
                            <div>Rs.{cart.itemsPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Shipping Price:</div>
                                <div>Rs.{cart.shippingPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Tax Price:</div>
                                <div>Rs.{cart.taxPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div><strong>Total:</strong></div>
                                <div><strong>Rs.{cart.totalPrice.toFixed(2)}</strong></div>
                            </div>
                        </li> 
                        <li>
                            <button className="primary block" type="submit" onClick={placeOrderHandler} disabled={cart.cartItems.length===0}>Place Order</button>
                        </li>  
                        {loading && (<LoadingBox></LoadingBox>)}
                        {error && <MessageBox>{error}</MessageBox>}
                    </ul>
                </div>
            </div>
            </div>
        </div>
    )
}

export default PlaceOrderScreen
