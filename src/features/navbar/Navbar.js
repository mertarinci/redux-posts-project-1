import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {logout,reset} from "../auth/authSlice"

export default function Navbar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const  {user} = useSelector(state => state.auth)


    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate("/")
    }



  return (
    <div className='nav navbar bg-light text-center d-flex justify-content-space-between p-4' style= {{height: "120px"}}>
      
        <div className='navbar-brand'>BBC Posts</div>
        <div><h2>Posts Homepage</h2>
        </div>
        <div>{user ? (<Link to={"/posts/createPost"}><button className='btn btn-success btn-lg'>Add New Post</button></Link>) : (<></>)}</div>
        <div>
            {user ? (<div>You are logged as : <span style={{fontWeight:"bold", paddingRight:"20px"}}>{user.data.username}</span> <button onClick={onLogout} className='btn btn-danger'> Logout</button></div>): (<Link to={"/login"}><button className='btn btn-primary btn-lg'>Login</button></Link>)}
            </div>
    </div>
  )
}
