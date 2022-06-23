import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function LoginPage() {

   
    const navigate = useNavigate();

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const handleSubmit = async (e) => {

        e.preventDefault();


        await axios.post("http://localhost:4000/api/user/login", {
            username:username,
            password:password
        })
            .then(async res => {if(res.status === 200){

                document.getElementById("username").value=""
                document.getElementById("password").value=""

                await Swal.fire({
                    icon: 'success',
                    title: "Welcome back! You logged in.",
                    html:"Congrats!",
                    timer: 1000,
                    timerProgressBar: true})

                localStorage.setItem("token",JSON.stringify(res.data.access_token));

                navigate("/");

            


            }})
            .catch(err => {

                document.getElementById("errorMessage").innerHTML = `
                ${err.response.data.message}
                `

                Swal.fire({
                    icon: 'warning',
                    title: 'Oups, there is a mistake!',
                    html:`${err.response.data.message}`,
                    timer: 2000,
                    timerProgressBar: true})})
            
    }

    return (
        <div className='text-center container' style={{marginTop:"120px"}}>
            <h1 className='mb-3'>BBC Posts</h1>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit} className='text-center style mt-5'>
                <div className="mb-3">
                    <p id='errorMessage' className='bg-danger' style={{width:"300px", marginLeft:"500px", fontWeight:"bold", color:"white"}}></p>
                    <label className="form-label">Username</label>
                    <input onChange={(e)=> setUsername(e.target.value)}  id='username' style={{width:"200px", margin:"auto"}} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input onChange={(e)=> setPassword(e.target.value)} id='password' style={{width:"200px", margin:"auto"}} type="password" className="form-control" />
                </div>
                <div className="mb-3 form-check">
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

        </div>

    )
}
