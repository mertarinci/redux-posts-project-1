/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



function AllUsers() {

    const [users, setUsers] = useState([]);




    const token = (JSON.parse(localStorage.getItem("user")))



    useEffect(() => {



        async function fetchData() {

            if(token){

                await axios.get("http://localhost:4000/api/user/getAllUsers", {
                    headers: {
                        "Authorization": `Bearer ${token.access_token}`
                    }}).then(res => {
                    if (res.status === 200) {
                        setUsers(res.data.data)
                    }
                }).catch(err =>
                    document.querySelector(".errorMessage").innerHTML = `${err.response.data.message}`)

            }else{
                document.querySelector(".errorMessage").innerHTML = `You have to login.`
            }


        }
        fetchData();
    }, [])

    console.log(users)

    const renderUsers = () => {

        if(users.length !== 0){

            return (
                <div>
                    <h3>List of Users</h3>
                    <ul>
                        {users?.map(user => (
                            <li key={user.userId}>{user.username}</li>
                        ))}
                    </ul>
    
                </div>
    
            )

        }
        
    }





    return (
        <div>
        <Link to={"/"}> <button className='btn btn-primary'>Back to Homepage</button></Link>
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