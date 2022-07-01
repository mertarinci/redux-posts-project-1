import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { getAllUsers } from "../user/userSlice"
import { Link } from 'react-router-dom'

function Chat() {

    


    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)

    const {allUsers} = useSelector (state => state.users)

    const token = user?.access_token



    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState({
        message: ""
    })


    const url = "http://localhost:4000/api/chat"


    const getMessages = async () => {

        const response = await axios.get(url,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

        setMessages(response.data.data)

    }

    useEffect(() => {

        getMessages()

        dispatch(getAllUsers())

    }, [dispatch,message,messages])


    const sendMessage = async (e) => {



        e.preventDefault();

        const msgBox = document.getElementById("msgBox").value = null

        setMessage("")


        const response = await axios.post(url, {

            message: message.message,
            user: user.data.username

        },
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).catch(err => alert(err.response.data.message))


    }


    const onChange = (e) => {
        setMessage(() => ({
            [e.target.name]: e.target.value
        }))
    }

    return (

        <div className='row'>
            <div style={{marginTop:"58px"}} className='col-3 text-center'>

                

            <ul className='border'>
                <h2>Admins</h2>
                    {allUsers?.map(u => (u.role === "admin") ? (<div key={u.username}>{u.username} {u.isOnline ? (<span style={{color:"green"}}>Online</span>) : (<span style={{color:"red"}}>Off</span>)} </div>) : (<></>))}
                </ul>
                <ul className='border'>
                    <h2>Users</h2>
                    {allUsers?.map(u => (u.role === "user") ? (<div key={u.username}>{u.username} {u.isOnline ? (<span style={{color:"green"}}>Online</span>) : (<span style={{color:"red"}}>Offline</span>)}</div>) : (<></>))}
                    
                </ul>

                <Link to={"/"}><button className='btn btn-primary btn-lg'>Homepage</button></Link>

                
            </div>
            <div className='container text-center col-8'>

                <h1>Chat</h1>

                <div id="chatbox" className='border text-center' style={{ width: "1300px", height: "700px", overflow: "auto", display: "flex", flexDirection: "column-reverse" }}>

                    {
                        messages?.map(msg => msg.userRole === "admin"
                        ? (<div key={msg.id} className="p-1" style={{ color: "red", display: "inline-block" }}>{msg.user} [{msg.userRole}] : {msg.message}</div>) : (<div className="p-1" style={{ color: "gray", display: "inline-block" }}>{msg.user} [{msg.userRole}] : {msg.message}</div>))
                    }

                </div>
                <form className="input-group mb-3">
                    <input id='msgBox' onChange={onChange} name="message" type="text" className="form-control" placeholder="Enter your message" />
                    <button onClick={(e) => { sendMessage(e) }} className="btn btn-primary">Send</button>
                </form>

            </div>

        </div>



    )
}

export default Chat