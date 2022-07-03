import React, { useState,useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {useSelector,useDispatch} from "react-redux"
import {login,reset} from "../features/auth/authSlice"
import axios from "axios"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        BBC Posts
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();



export default function SignInSide() {
    
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

        ForPassEmail.style.display = "block";
        submitForgotPass.style.display = "inline-block";


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
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              BBC Posts Login Page
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
              <TextField
                onChange={onChange}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
              />
              <TextField
                 onChange={onChange}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="http://localhost:3000/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <div className='mt-2 text-center' id='forgotPassword'>
            <Button
                style={{marginTop:"100px"}}
                id="forgotPassBtn"
                type="submit"
                variant="contained"
                onClick={() => forgotPassButton()}
                sx={{ mt: 3, mb: 2 }}
              >
                Forgot Password?
              </Button>
            <form>
            <input onChange={(e) => setEmail(e.target.value) }  id='forgotPasswordEmail' style={{width:"400px", margin:"auto", display:"none"}} placeholder="Please enter your email" type="text" className="form-control mt-3" />
            
            <button onClick={(e) => submitForgotPass(e)} id='submitForgotPass' style={{display:"none"}} type="submit" className="btn btn-warning mt-3">Email My Password</button>
           </form>
            </div>
            <Copyright sx={{ mt: 5 }} />

          </Box>
          
        </Grid>
      </Grid>

    </ThemeProvider>
  );
}