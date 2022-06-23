import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom';

export default function Register() {

    const nav = useNavigate();


    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [username,setUsername] = useState("")


    const handleSubmit = async (e) => {

        e.preventDefault();

        await axios.post("https://babacanpostbe.herokuapp.com/api/user/register", {
            email:email,
            password:password,
            username:username
        }).then(async res => {if(res.status === 200){

                document.getElementById("username").value=""
                document.getElementById("email").value=""
                document.getElementById("password").value=""

                await Swal.fire({
                    icon: 'success',
                    title: 'Register sent successfully!',
                    html:"Congrats!",
                    timer: 2000,
                    timerProgressBar: true})

                nav("/")

                

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
            <Link to={"/"}><h1 className='mb-3'>BBC Posts</h1></Link>
            <h2>Register Page</h2>

            <form onSubmit={handleSubmit} className='text-center style mt-5'>
                <div className="mb-3">
                    <p id='errorMessage' className='bg-danger' style={{width:"500px", marginLeft:"380px", fontWeight:"bold", color:"white"}}></p>
                    <label className="form-label">Email</label>
                    <input id='email' onChange={(e) => setEmail(e.target.value)} style={{width:"200px", margin:"auto"}} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input id='username' onChange={(e) => setUsername(e.target.value)} style={{width:"200px", margin:"auto"}} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input id='password' onChange={(e) => setPassword(e.target.value)} style={{width:"200px", margin:"auto"}} type="password" className="form-control" />
                </div>
                <div className="mb-3 form-check">
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

        </div>

    )
}
