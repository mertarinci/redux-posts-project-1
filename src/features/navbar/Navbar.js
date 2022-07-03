import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {logout,reset} from "../auth/authSlice"
import { Avatar } from '@mui/material';

export default function Navbar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const  {user} = useSelector(state => state.auth)

   const userData = {
    username: user?.data.username
   }

    const onLogout = () => {

        dispatch(logout(userData))
        dispatch(reset())
        navigate("/")
    }




  return (
    <div className='nav navbar bg-light text-center d-flex justify-content-space-between p-4' style= {{height: "120px"}}>
      
        <div className='navbar-brand'>BBC Posts</div>
        <div><h2 className='mb-2'>Posts Homepage</h2>
        </div>
        
        <div>

        <div>{user?.data.role === "admin" ? ("Welcome back my precious admin!") : (<></>)}</div>
            
            {user ? 
            (<div> <Link style={{marginRight:"20px"}} to={"/chat"}><button className='btn btn-success btn-lg'>Live Chat</button></Link>
              <Link style={{marginRight:"20px"}} to={"/posts/createPost"}><button className='btn btn-warning btn-lg'>Add New Post</button></Link> You are logged as : <span style={{fontWeight:"bold", paddingRight:"20px"}}>{user.data.username}</span> <button onClick={onLogout} className='btn btn-danger'> Logout</button></div>): (<div><Link to={"/login"}><button className='btn btn-primary btn-lg'>Login</button></Link> <Link to={"/register"}><button className='btn btn-success btn-lg'>Register</button></Link></div> )}
            </div>
    </div>
  )
}
