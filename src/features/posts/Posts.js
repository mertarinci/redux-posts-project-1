import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../user/userSlice';
import { getPosts } from './postSlice';
import { Link } from "react-router-dom";



export default function Posts() {

    const posts = useSelector(state => state.posts.list);
    const users = useSelector(state => state.users.list);


    const dispatch = useDispatch();


    useEffect(() => {

        dispatch(getPosts({ limit: "" }))

        dispatch(getUsers())

    }, [dispatch])


    return (


        <div className='mt-5'>
            <div className='row'>
                <div className='container col-3 text-center'>
                    <ul className="list-group" style={{ width: "300px", marginLeft: "20px", fontSize: "1.5rem" }}>
                        <h2 className='p-2'>Authors</h2>
                        {
                            users.map((user) => (
                                <Link key={user.id} style={{ textDecoration: 'none' }} to={`/user/${user.id}`}>
                                    <li onMouseOver={(e) => e.target.classList.add("bg-info")} onMouseLeave={(e) => e.target.classList.remove("bg-info")} className="list-group-item">{user.name}</li>
                                </Link>


                            ))
                        }

                    </ul>
                </div>
                <div className='col-9'>
                    <div className='row'>

                        {posts.map(post => (

                            <div key={post.id} className='col-3'>
                                <div  className="card" style={{ width: "18rem" }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{post.title}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Post Id: {post.id}</h6>
                                        <p className="card-text">{post.body}</p>
                                        <div className="card-footer text-muted text-center">
                                            Author: {post.userId}
                                        </div>
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


