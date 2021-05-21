import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import {register } from "../actions/userActions"
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function RegisterScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const {userInfo,loading,error} = userRegister;

    const redirect = props.location.search ? props.location.search.split('=')[1] : "/";
    const dispatch = useDispatch()
    const submitHandler=(e) => {
        e.preventDefault();
        if(confirmPassword != password)
            alert("Confirm Password and password does not match");
        else
            dispatch(register(name,email,password));
    }
    useEffect(() => {
        if(userInfo)
            props.history.push(redirect)

    }, [userInfo])
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Create Account</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox>{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder="Enter password again" onChange={(e)=>setConfirmPassword(e.target.value)} required></input>
                </div>
                <div>
                    <button type="submit" className="primary">Register</button>
                </div>
                <div>
                    Already Have An Account? <Link to={`/signIn?redirect=${redirect}`}>Sign-In</Link>
                </div>
            </form>
        </div>
    )
}

export default RegisterScreen
