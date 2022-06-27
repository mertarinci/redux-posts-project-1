import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../user/userSlice';
import { getPosts } from './postSlice';
import { Link } from "react-router-dom";



export default function Posts() {




    const dispatch = useDispatch();


    const {posts} = useSelector(state => state.posts);
    const {users} = useSelector(state => state.users);
    const {user} = useSelector(state => state.auth);
    const count = useSelector(state => state.users.count)

    const [query, setQuery] = useState("")
  
    useEffect(() => {

         dispatch(getPosts())
        
         dispatch(getUsers({query: query ? `${query}`: "?limit=5" }))

 
    }, [dispatch, query])




    return (
        <div className='mt-5'>
            <div className='row'>

                <div className='container col-3 text-center'>

                {user ? ( <Link style={{marginRight:"115px"}} to={"/allUsers"}><button className='btn btn-warning p-2'>All Users</button></Link>): (<></>)}
                    <ul className="list-group" style={{ width: "300px", marginLeft: "20px", fontSize: "1.5rem" }}>
                        <h2 className='p-2'>Authors</h2>
                        {
                            users.map((user) => (
                                <Link key={user.userId} style={{ textDecoration: 'none' }} to={`/user/${user.username}`}>
                                    <li onMouseOver={(e) => e.target.classList.add("bg-info")} onMouseLeave={(e) => e.target.classList.remove("bg-info")} className="list-group-item">{user.username}</li>
                                </Link>
                            ))
                        }

                    </ul>



                    <button className='btn btn-primary' onClick={() => setQuery("?page=1&limit=5")}>1</button>
                    <button className='btn btn-primary' onClick={() => setQuery("?page=2&limit=5")}>2</button>
                    <button className='btn btn-primary' onClick={() => setQuery("?page=3&limit=5")}>3</button>
                    <button className='btn btn-primary' onClick={() => setQuery("?page=4&limit=5")}>4</button>




                    
                    <p >Total Pages: {Math.ceil(count / 5)}</p>

                    

                </div>
                <div className='col-lg-9'>
                    <div className='row'>

                       

                        {posts.map(post => (

                            <div key={post._id} className='col-lg-3'>
                                <div  className="card" style={{ width: "18rem" }}>
                                <img style={{width:"286px",height:"285px"}} src={post.postImage} className="card-img-top" alt="images"/>
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{post.title}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Post Id: {post._id}</h6>
                                        <hr></hr>
                                        <p className="card-text">{post.content}</p>
                                        <div className="card-footer text-muted text-center">
                                            <Link to={`/posts/${post._id}`}><button className='btn btn-success'>Haberin detayları</button></Link>
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


