import React from "react"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import {BrowserRouter, Link, Route} from "react-router-dom"
import StoreIcon from '@material-ui/icons/Store';
import CartScreen from "./screens/CartScreen";
import { useDispatch, useSelector } from "react-redux";
import SignInScreen from "./screens/SignInScreen";
import { signOut } from "./actions/userActions";
import RegisterScreen from "./screens/RegisterScreen"
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PayMethodScreen from "./screens/PayMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import PayOrderScreen from "./screens/PayOrderScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    const cart= useSelector(state => state.cart);
    const {cartItems}= cart;
    const userSignIn= useSelector(state => state.userSignIn);
    const {userInfo} = userSignIn;
    const dispatch = useDispatch()
    const signOutHandler=()=>{
        dispatch(signOut())
    }
  return (
    <BrowserRouter>
    <div className="grid-container">
        <header className="row">
            <div className="brand">
                <Link to="/"><StoreIcon className="storeIcon" /> Amaze</Link>
            </div>
            <div>
                <Link to="/cart">Cart
                {
                    cartItems.length>0 && <span className="badge">{cartItems.length}</span>
                }
                </Link>
                {
                    userInfo ? (
                        <div className="dropdown">
                            <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                            <div className="dropdown-content">
                                <ul>
                                    <li>
                                        <Link to='/profile'>Profile</Link>
                                    </li>
                                    <li>
                                        <Link to='/orders-history'>Order History</Link>
                                    </li>
                                    <li>
                                        <Link to="#signOut" onClick={signOutHandler}>Sign Out</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>)
                    :(<Link to="/signin">SignUp</Link>)
                }
                
            </div>
        </header>
        <main>
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/products/:id" component={ProductScreen} />
            <Route path="/signin" component={SignInScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/shipping" component={ShippingAddressScreen} />
            <Route path="/payment" component={PayMethodScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/orders-history" component={OrderListScreen} />
            <Route path="/orders/:id" component={PayOrderScreen} />
            <PrivateRoute path='/profile' component={UserProfileScreen} />
            <Route path="/" component={HomeScreen} exact />
        </main>
        <footer className="row center">
            All Rights Reserved
        </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
