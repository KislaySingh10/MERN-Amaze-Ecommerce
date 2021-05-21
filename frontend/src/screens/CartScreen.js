import React, { useEffect } from 'react'
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux'
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';

function CartScreen(props) {
    const productID=props.match.params.id;
    const qty=props.location.search? Number(props.location.search.split("=")[1]):1;
    const dispatch = useDispatch();
    useEffect(() => {
        if(productID)
            dispatch(addToCart(productID,qty));
    }, [productID])
    const cart = useSelector(state => state.cart);
    const {cartItems}=cart;
    const deleteCartItem=(id)=>{
        dispatch(removeFromCart(id));
    }
    const checkoutHandler=()=>{
        props.history.push(`/signin?redirect=shipping`)
    }
    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                {
                    cartItems.length==0 ? (
                    <MessageBox>Your cart is empty.<Link to="/"> Continue shopping.</Link></MessageBox>) :(
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.product}>
                                    <div className="row">
                                        <div>
                                            <img src={item.image} alt={item.name} className="small" />
                                        </div>
                                        <div className="min-20">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div>
                                            <select value={item.qty} onChange={e => dispatch(addToCart(item.product,Number(e.target.value)))}>
                                            {[...Array(item.count).keys()].map(x => (
                                                <option value={x+1}>{x+1}</option>
                                            ))}
                                            </select>
                                        </div>
                                        <div>
                                            Rs.{item.price}
                                        </div>
                                        <div>
                                            <button type="button" onClick={()=> deleteCartItem(item.product)} className="button">Delete Item</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )

                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                    <li >
                        <div className="row">
                            <div>
                                <h2>
                                    Subtotal ({cartItems.reduce((a,c) => a+c.qty,0)} Items):
                                </h2>
                            </div>
                            <div>
                                <h2>Rs.{cartItems.reduce((a,c) => a+ c.qty * c.price,0)}</h2>
                            </div>
                        </div> 
                    </li>
                    <li>
                        <button type="button" className="primary block" onClick={checkoutHandler} disabled={cartItems.length===0}>
                            Proceed To Checkout
                        </button>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CartScreen
