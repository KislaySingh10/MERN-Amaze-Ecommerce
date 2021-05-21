import { PromiseProvider } from 'mongoose'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mineOrderList } from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

function OrderListScreen(props) {
    const orderHistory = useSelector(state => state.orderHistory)
    const {loading,error,orderList} = orderHistory
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(mineOrderList());
    },[dispatch])
    return (
        <div>
            <h1>Order History</h1>
            {loading ? <LoadingBox></LoadingBox> :
            error? <MessageBox>{error}</MessageBox>:
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>AMOUNT</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList.map(order=>(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>Rs.{order.totalPrice}</td>
                            <td>{order.isPaid ? order.paid.substring(0,10) : "No"}</td>
                            <td>{order.isDelivered ? order.delivered.substring(0,10) : "No"}</td>
                            <td>
                                <button type="button" onClick={()=>{props.history.push(`/orders/${order._id}`)}}>Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </div>
    )
}

export default OrderListScreen
