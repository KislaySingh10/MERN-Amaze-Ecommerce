import { CART_EMPTY } from "../constants/cartConstants";
import { ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, PAY_ORDER_FAIL, PAY_ORDER_REQUEST, PAY_ORDER_SUCCESS, PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from "../constants/orderConstants"
import axios from "axios"

export const placeOrder= (order)=>async(dispatch,getState)=>{
    dispatch({
        type:PLACE_ORDER_REQUEST,
        payload: order
    })
    try {
        const {userSignIn:{userInfo}}=getState();
        const {data}= await axios.post("/api/orders",order,{
            headers:{
                authorization:`Bearer ${userInfo.token}`
            }
        })
        dispatch({type:PLACE_ORDER_SUCCESS,payload:data})
        dispatch({type:CART_EMPTY})
        localStorage.removeItem("cartItems")
        
    } catch (error) {
        dispatch({
            type:PLACE_ORDER_FAIL,
            payload:error.response && error.response.data.message? error.response.data.message : error.message
        })        
    }
}

export const getOrderDetail=(orderId)=>async(dispatch,getState)=>{
    dispatch({type:ORDER_DETAILS_REQUEST,payload:orderId})
    const {userSignIn:{userInfo}}=getState();
    try {
        const {data}= await axios.get(`/api/orders/${orderId}`,{
            headers:{authorization:`Bearer ${userInfo.token}`}
        })
        dispatch({type:ORDER_DETAILS_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response && error.response.data.message? error.response.data.message : error.message
        })  
    }
}

export const payOrder=(order,paymentResult)=>async(dispatch,getState)=>{
    dispatch({type:PAY_ORDER_REQUEST,payload:{order,paymentResult}})
    const {userSignIn:{userInfo}}=getState();
    try {
        const {data} = await axios.put(`/api/orders/${order._id}/paid`,paymentResult,{
            headers:{authorization:`Bearer ${userInfo.token}` }
        })
        dispatch({type:PAY_ORDER_SUCCESS,payload:data})
    } catch (error) {
        dispatch({
            type:PAY_ORDER_FAIL,
            payload:error.response && error.response.data.message? error.response.data.message : error.message
        })  
    }
}

export const mineOrderList=()=>async(dispatch,getState)=>{
    dispatch({type: ORDER_LIST_REQUEST})
    const {userSignIn:{userInfo}}= getState();
    try {
        const {data}= await axios.get('/api/orders/mine',{
            headers:{authorization:`Bearer ${userInfo.token}`}
        })
        dispatch({type:ORDER_LIST_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
            type:ORDER_LIST_FAIL,
            payload:error.response && error.response.data.message? error.response.data.message : error.message
        })  
    }
}