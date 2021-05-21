import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {updateUserProfile} from '../actions/userActions'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

function UserProfileScreen(props) {
    const userSignIn = useSelector(state => state.userSignIn)
    const {userInfo} = userSignIn;
    const [name, setName] = useState(userInfo.name)
    const [email, setEmail] = useState(userInfo.email)
    const [password, setPassword] = useState()
    const [confirm, setConfirm] = useState()
    const userUpdate = useSelector(state => state.userUpdate)
    const {success, loading, error} = userUpdate;
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type:USER_UPDATE_RESET})
    }, [])
    const updateProfileHandler=(e)=>{
        e.preventDefault();
        if(password!=confirm)
            alert("Password and Confirm Password does not match!!!")
        else 
            dispatch(updateUserProfile({userId:userInfo._id, name,email,password}))
    }
    return (
        <div>
            <form className="form" onSubmit={updateProfileHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox>{error}</MessageBox>}
                {success && <MessageBox>User Profile Updated Successfully</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter Full Name" value={name} onChange={(e)=>setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter Email Address" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Email</label>
                    <input type="password" id="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="confirm">Email</label>
                    <input type="password" id="confirm" placeholder="Confirm Password" onChange={(e)=>setConfirm(e.target.value)}></input>
                </div>
                <div>
                    <button type="submit" className="primary">Update Profile</button>
                </div>
            </form>
        </div>
    )
}

export default UserProfileScreen
