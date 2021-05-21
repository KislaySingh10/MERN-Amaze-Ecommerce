import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { detailProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import Rating from '../components/Rating'


function ProductScreen(props) {
    const dispatch = useDispatch();
    const productID=props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const {loading,error,product}=productDetails;
    useEffect(() => {
        dispatch(detailProduct(productID))
    }, [dispatch])
    const addToCartHandle=()=>{
        props.history.push(`/cart/${productID}?qty=${qty}`)
    }
    return (
        <div>
            {loading?<LoadingBox />
            :
            error?<div>{error}</div>
            :
            (
                <div>
            <Link to="/">Back to results</Link>
            <div className="row top">
                <div className="col-2">
                    <img src={product.image} className="large" alt={product.name}></img>
                </div>
                <div className="col-1"> 
                    <ul>
                        <li><h1>{product.name}</h1></li>
                        <li>
                            <Rating rating={product.rating} numReviews={product.numReviews} />
                        </li>
                        <li>Price: Rs.{product.price}</li>
                        <li>Description: {product.description}</li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                    <ul>
                        <li >
                            <div className="row">
                            <div>Status:</div>
                            <div>
                                {product.count>0?(
                                    <span>Available</span>
                                ):(
                                    <span>Unavailable</span>
                                )}
                            </div>
                            </div>
                        </li>
                        {product.count > 0 && (
                            <>
                            <li>
                                <div className="row">
                                    <div>Quantity</div>
                                    <div>
                                        <select value={qty} onChange={event => setQty(event.target.value)}>
                                            {[...Array(product.count).keys()].map(x => (
                                                <option value={x+1}>{x+1}</option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                </div>
                            </li>
                            <li>
                            <button className="primary block" onClick={addToCartHandle}>Add To Cart</button>
                            </li>
                            </>
                           
                        )}
                        
                    </ul>
                    </div>
                    
                </div>
            </div>
        </div>
            )}
            
        </div>
        
    )
}

export default ProductScreen
