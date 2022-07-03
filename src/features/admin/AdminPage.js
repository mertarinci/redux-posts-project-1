import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../posts/postSlice';
import { getAllUsers, getUsers } from '../user/userSlice';

function AdminPage() {


    const dispatch = useDispatch();

    const { allUsers, users } = useSelector(state => state.users)
    const { posts } = useSelector(state => state.posts)
    const { user } = useSelector(state => state.auth);
    const count = useSelector(state => state.users.count);



    const [userId, setUserId] = useState("")
    const [role, setRole] = useState("")




    const [query, setQuery] = useState({
        limit: 4,
        page: 1
    })

    const { limit } = query



    useEffect(() => {

        dispatch(getUsers({ query: `?limit=${query.limit}&page=${query.page}` }))
        dispatch(getAllUsers())
        dispatch(getPosts())

    }, [dispatch, query])

    const arrCount = Math.ceil(count / query.limit)
    const arr = [...Array(arrCount).keys()]


    const handleClick = async (e) => {
        await axios.put("http://localhost:4000/api/admin/giveRole",{
            id:userId,
            role:role
        }).then(res => console.log(res.data))
        .catch(err => console.log(err.data))


        window.location.reload()


    } 





    return (
        <div>
            <nav className="navbar bg-light" style={{ height: "70px" }}>
                <div className="container-fluid">
                    <span style={{ margin: "auto" }} className="navbar-brand h1 ">BBC Posts Admin Panel</span>
                </div>
            </nav>

            <div className="row mt-3">

                <div className='col-6 text-center border'>
                    <h1 className='text-danger'>Users</h1>

                    <h2>Asign Role</h2>

                    <div className="input-group mb-3">
                        <select onChange={(e) => setUserId(e.target.value)} className="form-select" id="inputGroupSelect02">
                            <option selected>Choose User...</option>
                            {allUsers?.map(u => (<option key={u._id} name="selectedUser" value={u._id}>{u.username}</option>))}
                        </select>
                        <select onChange={(e) => setRole(e.target.value)} className="form-select" >
                            <option selected className="form-select">Choose Role...</option>
                            <option className="form-select" value="admin">Admin</option>
                            <option className="form-select" value="moderator">Moderator</option>
                            <option className="form-select" value="user">User</option>

                        </select>
                        <button onClick={() => handleClick()} className="btn btn-primary input-group-text">Asign Role</button>
                    </div> <br></br>

                            <h2>List of All Users</h2>
                    <div style={{marginTop: "30px" }}>
                        {arr.map(b => (
                            <button onClick={() => setQuery({ page: b + 1, limit })} key={b} className='btn btn-primary m-1'>{b + 1}</button>
                        ))}
                        <p style={{fontWeight:"bold"}} >Total Pages: {Math.ceil(count / query.limit)}</p>
                    </div>


                    {users?.map(user => (
                        <div key={user._id} className="list-group mb-2">
                            <div className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">User Id: {user.userId} /  Username: {user.username}</h5>
                                    <small>Created At: {user.createdAt.split("T")[0]}</small>
                                </div>
                                <p className="mb-1">
                                    Email: {user.email} <br></br>
                                    Profile Image: {user.profileImage} <br></br>
                                    DB ID: {user._id} <br></br>
                                    isOnline: {user.isOnline ? ("Online") : ("Offline")}
                                </p>
                                <p style={{fontWeight:"bold"}}> Role: {user.role === "admin" ? (<small className='text-danger'>{user.role}</small>) : (<small className='text-secondary'>{user.role}</small>)}</p>

                            </div>
                        </div>

                    ))}


                </div>
                <div className='col-6 text-center border'>
                    <h1 className='text-danger'>Posts</h1>

                    <div className='row'>

                        {posts?.map(post => (

                            <div key={post._id} className='col-3 mb-2 d-flex align-items-stretch'>
                                <div className="card" style={{ width: "10rem" }}>
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{post.title}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Post Id: {post._id}</h6>
                                        <p>Author: {allUsers?.map(user => {
                                            if (user.userId === post.user) {
                                                return (<span key={user.userId}>{user.username}</span>)
                                            }
                                        })}</p>
                                    </div>
                                </div>


                            </div>

                        ))}

                    </div>

                </div>

            </div>


        </div>
    )
}

export default AdminPage