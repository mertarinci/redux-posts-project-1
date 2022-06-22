import React, { useState } from 'react'

export default function Register() {


    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [username,setUsername] = useState("")



    return (
        <div className='text-center container' style={{marginTop:"120px"}}>
            <h1 className='mb-3'>BBC Posts</h1>
            <h2>Register Page</h2>
            <form className='text-center style mt-5'>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input style={{width:"200px", margin:"auto"}} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input style={{width:"200px", margin:"auto"}} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input style={{width:"200px", margin:"auto"}} type="password" className="form-control" />
                </div>
                <div className="mb-3 form-check">
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

        </div>

    )
}
