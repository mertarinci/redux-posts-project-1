import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {useSelector,useDispatch} from "react-redux"
import {login,reset} from "../features/auth/authSlice"



export default function LoginPage() {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username:"",
        password:""
    })

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    const {username,password} = formData

    useEffect(() => {

        if(isError){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: message,
                footer: '<a href="">Why do I have this issue?</a>'
              })
        }

        if(isSuccess || user){

            navigate("/")
        }

        dispatch(reset())

    },[user,isError,isSuccess,message,navigate,dispatch])





    const onChange = (e) => {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            username,
            password
        }

        dispatch(login(userData))

    }



    return (
        <div className='text-center container' style={{marginTop:"120px"}}>
            <h1 className='mb-3'>BBC Posts</h1>
            <h2>Login Page</h2>
            <form onSubmit={onSubmit} className='text-center style mt-5'>
                <div className="mb-3">
                    <p id='errorMessage' className='bg-danger' style={{width:"300px", marginLeft:"500px", fontWeight:"bold", color:"white"}}></p>
                    <label className="form-label">Username</label>
                    <input name='username' onChange={onChange}  id='username' style={{width:"200px", margin:"auto"}} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input name='password' onChange={onChange}   id='password' style={{width:"200px", margin:"auto"}} type="password" className="form-control" />
                </div>
                <div className="mb-3 form-check">
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

        </div>

    )
}
