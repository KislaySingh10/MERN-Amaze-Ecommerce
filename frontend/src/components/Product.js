import React from 'react'
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Product(props) {
    const {product} =props;
    return (
        <div>
            <div id={product._id} className="card">
                    <Link to={'/products/'+product._id}>
                        <img className="medium" src={product.image} alt="Product" />
                    </Link>
                    <div className="card-body">
                        <Link to={'/products/'+product._id}>
                            <h2>{product.name}</h2>
                        </Link>
                    <Rating rating={product.rating} numReviews={product.numReviews} />
                    <div className="price">Rs.{product.price}</div>
                    </div>
            </div> 
        </div>
    )
}

export default Product
