
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux"
import Swal from "sweetalert2"
import {register,reset} from "../features/auth/authSlice"




export default function Register() {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:"",
        firstName:"",
        lastName:""
    })

    const {username,email,password,firstName,lastName} = formData

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)


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
            email,
            password,
            lastName,
            firstName
        }

        dispatch(register(userData))

    }




    return (
        <div className='text-center container' style={{marginTop:"120px"}}>
            <Link to={"/"}><h1 className='mb-3'>BBC Posts</h1></Link>
            <h2>Register Page</h2>

            <form onSubmit={onSubmit} className='text-center style mt-5'>
            <div className="mb-3">
                    <p id='errorMessage' className='bg-danger' style={{width:"500px", marginLeft:"380px", fontWeight:"bold", color:"white"}}></p>
                    <label className="form-label">First Name</label>
                    <input name='firstName' id='firstName' onChange={onChange} style={{width:"200px", margin:"auto"}} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <p id='errorMessage' className='bg-danger' style={{width:"500px", marginLeft:"380px", fontWeight:"bold", color:"white"}}></p>
                    <label className="form-label">Last Name</label>
                    <input name='lastName' id='lastName' onChange={onChange} style={{width:"200px", margin:"auto"}} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <p id='errorMessage' className='bg-danger' style={{width:"500px", marginLeft:"380px", fontWeight:"bold", color:"white"}}></p>
                    <label className="form-label">Email</label>
                    <input name='email' id='email' onChange={onChange} style={{width:"200px", margin:"auto"}} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input name='username' id='username' onChange={onChange}  style={{width:"200px", margin:"auto"}} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input name='password' id='password' onChange={onChange}  style={{width:"200px", margin:"auto"}} type="password" className="form-control" />
                </div>
                <div className="mb-3 form-check">
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>

        </div>

    )
}
