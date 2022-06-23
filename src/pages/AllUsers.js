/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function AllUsers() {

    const [users, setUsers] = useState([]);

    const token = JSON.parse(localStorage.getItem("token"))



    useEffect(() => {

        async function fetchData() {
            await axios.get("http://localhost:4000/api/user/getAllUsers", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(res => {
                if (res.status === 200) {
                    setUsers(res.data.data)
                }
            }).catch(err =>
                document.querySelector(".errorMessage").innerHTML = `${err.response.data.message}`)

        }
        fetchData();
    }, [token])

    const renderUsers = () => {

        if(users.length !== 0){

            return (
                <div>
                    <h3>List of Users</h3>
                    <ul>
                        {users.map(user => (
                            <li key={user.userId}>{user.username}</li>
                        ))}
                    </ul>
    
                </div>
    
            )

        }
        
    }





    return (
        <div>
            <h1 className='errorMessage'></h1>
{/* 

            {users.map(user => (
                            <li key={user.userId}>{user.username}</li>
                        ))} */}

                        {renderUsers()}



        </div>

    )
}

export default AllUsers