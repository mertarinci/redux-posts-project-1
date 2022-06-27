
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
        password:""
    })

    const {username,email,password} = formData

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
            password
        }

        dispatch(register(userData))

    }






    

    // const nav = useNavigate();


    // const [email,setEmail] = useState("")
    // const [password,setPassword] = useState("")
    // const [username,setUsername] = useState("")


    // const handleSubmit = async (e) => {

    //     e.preventDefault();

    //     await axios.post("http://localhost:4000/api/user/register", {
    //         email:email,
    //         password:password,
    //         username:username
    //     }).then(async res => {if(res.status === 200){

    //             document.getElementById("username").value=""
    //             document.getElementById("email").value=""
    //             document.getElementById("password").value=""

    //             await Swal.fire({
    //                 icon: 'success',
    //                 title: 'Register sent successfully!',
    //                 html:"Congrats!",
    //                 timer: 2000,
    //                 timerProgressBar: true})

    //             nav("/")

                

    //         }})
    //         .catch(err => {

    //             document.getElementById("errorMessage").innerHTML = `
    //             ${err.response.data.message}
    //             `

    //             Swal.fire({
    //                 icon: 'warning',
    //                 title: 'Oups, there is a mistake!',
    //                 html:`${err.response.data.message}`,
    //                 timer: 2000,
    //                 timerProgressBar: true})})
            

    // }



    return (
        <div className='text-center container' style={{marginTop:"120px"}}>
            <Link to={"/"}><h1 className='mb-3'>BBC Posts</h1></Link>
            <h2>Register Page</h2>

            <form onSubmit={onSubmit} className='text-center style mt-5'>
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
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

        </div>

    )
}
