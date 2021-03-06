import axios from "axios";

const API_URL = "http://localhost:4000/api/user/"


const register  = async (userData) => {
    const response = await axios.post(API_URL +"register",userData)


    if(response.data){
        localStorage.setItem("user",JSON.stringify(response.data))
    }

    return response.data
}

const login  = async (userData) => {
    const response = await axios.post(API_URL + "login",userData, {withCredentials:true})


    if(response.data){
        localStorage.setItem("user",JSON.stringify(response.data))

    }

    return response.data
}

const logout = async(userData) => {
    const response = await axios.post("http://localhost:4000/api/user/logout",userData, {withCredentials:true})

    localStorage.removeItem("user")


    console.log(response)
}


const authService = {
    register,
    login,
    logout
}

export default authService