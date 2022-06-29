import axios from 'axios';
import React, {useState} from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Swal from 'sweetalert2';


function ResetPassword() {


    const navigate = useNavigate();


    const [searchParams] = useSearchParams();
    const resetToken = searchParams.get("resetPasswordToken");
    const [password,setPassword] = useState("")


    const onSubmit = (e) => {
        e.preventDefault()

        const resetPassword = async () => {

            await axios.put("http://localhost:4000/api/user/resetPassword?resetPasswordToken="+resetToken,{
                password:password
            })

        
            .then(async (response) => {
                
                await Swal.fire({
                    icon: 'success',
                    title: "Yuppi!",
                    text: response.data.message,
                    timer:1500})

                    navigate("/login")

                })

                   .catch(err => 
                    Swal.fire({
                        icon: 'error',
                        title: "Oups...",
                        text: err.response.data.message,
                        timer:1500
                      })) 
        } 

        resetPassword();

    
    }


  return (
    <div className='text-center'>
        <Link  to={"/"}><button style={{marginTop:"50px"}}  className='btn btn-primary'>Back to Homepage</button></Link>
    
    <div className='container' style={{marginTop:"200px"}}>
                 

        <h1 className='mt-5'>Reset Your Password</h1>

        <form onSubmit={onSubmit} className='text-center style mt-5'>
                <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input name='password' onChange={(e) => setPassword(e.target.value)}   id='password' style={{width:"200px", margin:"auto"}} type="password" className="form-control" />
                </div>
                <div className="mb-3 form-check">
                </div>
                <button type="submit" className="btn btn-primary">Reset Password</button>
            </form>
        
    </div>
    </div>
  )
}

export default ResetPassword