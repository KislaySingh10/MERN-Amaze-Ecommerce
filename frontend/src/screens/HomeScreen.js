import React, { useEffect} from 'react'
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox'
import {listProducts} from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

function HomeScreen() {
    const dispatch = useDispatch();
    const productList= useSelector(state => state.productList);
    const {loading,error,products} =productList;
    useEffect(()=>{
        dispatch(listProducts())
    },[dispatch])
    return (
        <div>
            {loading?<LoadingBox />
            :
            error?<div>{error}</div>
            :
            (<div className="row center">
            {
                products.map(product => (
               <Product key={product._id} product={product} />
              ))}    
            </div>
            )}
            
        </div>
    )
}

export default HomeScreen
