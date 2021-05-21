import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import {signIn } from "../actions/userActions"
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function SignInScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignIn= useSelector(state => state.userSignIn);
    const {userInfo,loading,error} = userSignIn;

    const redirect = props.location.search ? props.location.search.split('=')[1] : "/";
    const dispatch = useDispatch()
    const submitHandler=(e) => {
        e.preventDefault();
        dispatch(signIn(email,password));
    }
    useEffect(() => {
        if(userInfo)
            props.history.push(redirect)
    }, [userInfo])
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>SignIn</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox>{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} required></input>
                </div>
                <div>
                    <button type="submit" className="primary">SignIn</button>
                </div>
                <div>
                    New Customer? <Link to={`/register?redirect=${redirect}`}>Create Your Account</Link>
                </div>
            </form>
        </div>
    )
}

export default SignInScreen
