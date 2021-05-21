import {createStore , applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension"
import {productDetailsReducer, productListReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userRegisterReducer, userSignInReducer, userUpdateReducer } from './reducers/userReducer'
import { orderDetailReducer, orderHistoryReducer, payOrderReducer, placeOrderReducer } from './reducers/orderReducers'

const reducer=combineReducers({
    productList: productListReducer,
    productDetails : productDetailsReducer,
    cart:cartReducer,
    userSignIn: userSignInReducer,
    userRegister: userRegisterReducer,
    placeOrder: placeOrderReducer,
    orderDetail: orderDetailReducer,
    payOrder: payOrderReducer,
    orderHistory: orderHistoryReducer,
    userUpdate: userUpdateReducer
})

const store=createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

export default store