import React, { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckOutSteps from '../components/CheckOutSteps';

function PayMethodScreen(props) {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart;
    if(!shippingAddress.address)
        props.history.push('/shipping');

    const [paymentMethod,setPaymentMethod]= useState("Paypal");
    const dispatch = useDispatch()
    const submitHandler=(e)=>{
        console.log(paymentMethod)
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }
    return (
        <div>
        <CheckOutSteps step1 step2 step3></CheckOutSteps>
        <form className="form" onSubmit={submitHandler}>
            <div>
                <h1>Payment Method</h1>
            </div>
            <div>
            <div>
                <input type="radio" id="Paypal" value="Paypal" name="PayMethod" required  checked onChange={(e)=>setPaymentMethod(e.target.value)}></input>
                <label htmlFor="Paypal">Paypal</label>
            </div>
            <div>
                <input type="radio" id="Stripe" value="Stripe" name="PayMethod" required onChange={(e)=>setPaymentMethod(e.target.value)}></input>
                <label htmlFor="Stripe">Stripe</label>
            </div>
            </div>
            <div>
                <button type="submit" className="primary">Continue</button>
            </div>
        </form>
        </div>
    )
}

export default PayMethodScreen
