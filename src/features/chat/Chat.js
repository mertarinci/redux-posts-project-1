import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import axios from "axios"

function Chat() {



    const { user } = useSelector(state => state.auth)

    const token = user?.access_token



    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState({
        message:""
    })


    const url = "http://localhost:4000/api/chat"


    useEffect(() => {


        const getMessages = async () => {

            const response = await axios.get(url,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })

            setMessages(response.data.data)

        }

        getMessages()

    }, [token, messages,message])



    const sendMessage = async (e) => {

        e.preventDefault();

        const msgBox = document.getElementById("msgBox").value = null


        const response = await axios.post(url, {

            message: message.message,
            user: user.data.username

        },
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
    }


    const onChange = (e) => {
       setMessage(()=> ({
            [e.target.name]:e.target.value
        }))
    }









    return (

        <div className='container text-center'>

            <h1>Chat</h1>

            <div id="chatbox" className='border text-center' style={{ width: "1300px", height: "700px", overflow: "auto" }}>

                {
                    messages?.map(msg => (<h3>{msg.message} <span style={{ fontSize: "16px" }}>{msg.userRole === "admin" 
                    ? (<div style = {{color:"red", display:"inline-block"}}>{msg.user} [{msg.userRole}]</div>) : (<div style = {{color:"green",display:"inline-block"}}>{msg.user} [{msg.userRole}]</div>)}</span></h3>))
                }

            </div>

                    {message.message}
            <form class="input-group mb-3">
                <input id='msgBox' onChange={onChange} name="message" type="text" class="form-control" placeholder="Enter your message"/>
                    <button onClick={(e) => {sendMessage(e)}} class="btn btn-primary">Send</button>
            </form>

        </div>


    )
}

export default Chat