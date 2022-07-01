import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {useSelector,useDispatch} from "react-redux"
import {login,reset} from "../features/auth/authSlice"
import axios from "axios"



export default function LoginPage() {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username:"",
        password:""
    })

    const {user, isError, isSuccess, message} = useSelector((state) => state.auth)

    const {username,password} = formData

    const [email,setEmail] = useState("")

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
            window.location.reload()
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
            password,
            isOnline: true
        }

        dispatch(login(userData))

    }

    const forgotPassButton = () => {

        const ForPassEmail = document.querySelector("#forgotPasswordEmail")
        const loginForm = document.querySelector("#loginForm")
        const loginHeader = document.querySelector("#loginHeader")
        const submitForgotPass = document.querySelector("#submitForgotPass")
        const forgotPassBtn = document.querySelector("#forgotPassBtn")
        const backToLogin = document.querySelector("#backToLogin")

        ForPassEmail.style.display = "block";
        submitForgotPass.style.display = "inline-block";
        backToLogin.style.display = "inline-block";


        loginForm.style.display = "none";
        forgotPassBtn.style.display = "none";


        loginHeader.innerHTML = "Forgot Password";

    }

    const submitForgotPass = async (e) => {

        e.preventDefault()



        axios.post("http://localhost:4000/api/user/forgotPassword",{
            email:email
        })
        .then(async (response) => {
                
            await Swal.fire({
                icon: 'success',
                title: "Yuppi!",
                text: response.data.message,
                timer:1500})

                window.location.reload()

            })

               .catch(err => 
                Swal.fire({
                    icon: 'error',
                    title: "Oups...",
                    text: err.response.data.message,
                    timer:1500
                  }))

    }







    return (
        <div className='text-center container' style={{marginTop:"10px"}}>

            <div style={{marginBottom:"100px"}}>
            <Link to={"/"}> <button className='btn btn-primary'>Back to Homepage</button></Link>
            <h1 className='mb-3'>BBC Posts</h1>
            </div>

            <h2 id='loginHeader' className='mb-5' >Login Page</h2>
            <form id='loginForm' onSubmit={onSubmit} className='text-center style mt-5'>
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

            <div className='mt-2' id='forgotPassword'>
            <button id='forgotPassBtn' onClick={() => forgotPassButton()} className="btn btn-success">Forgot Password?</button>
            <form>
            <input onChange={(e) => setEmail(e.target.value) }  id='forgotPasswordEmail' style={{width:"400px", margin:"auto", display:"none"}} placeholder="Please enter your email" type="text" className="form-control mt-3" />
            <button onClick={(e) => submitForgotPass(e)} id='submitForgotPass' style={{display:"none"}} type="submit" className="btn btn-warning mt-3">Email My Password</button>
           </form>
           <button onClick={() => window.location.reload()} id='backToLogin' style={{display:"none"}} className="btn btn-primary mt-3">Back To Login</button>
            </div>

        </div>

    )
}
