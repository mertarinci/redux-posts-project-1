/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../user/userSlice';
import { getPosts } from './postSlice';
import { Link } from "react-router-dom";
import ReadMoreReact from 'read-more-react';


export default function Posts() {




    const dispatch = useDispatch();

    const users = useSelector(state => state.users.allUsers);
    const { posts } = useSelector(state => state.posts);


    useEffect(() => {

        dispatch(getPosts())
        dispatch(getAllUsers())


    }, [dispatch])


    



    return (
        <div className='mt-5'>
            <div className='row'>
                {posts ? posts.map(post => (
                    <div key={post._id} className='col-lg-3'>
                        <div className="card" style={{ width: "18rem" }}>
                            <img style={{ width: "286px", height: "285px" }} src={post.postImage} className="card-img-top" alt="images" />
                            <div className="card-body text-center">
                                <h5 className="card-title">{post.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Post Id: {post._id}</h6>
                                <hr></hr>
                                <div className="card-text"><ReadMoreReact text={post.content}
                                    min={80}
                                    ideal={90}
                                    max={100}
                                    readMoreText="Devamını Oku" /></div>
                                <p>Author: {users.map(user => {
                                    if (user.userId === post.user) {
                                        return (<span key={user.userId}>{user.username}</span>)
                                    }
                                })}</p>

                                <div className="card-footer text-muted text-center">
                                    <Link to={`/posts/${post._id}`}><button className='btn btn-success'>Haberin detayları</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                )) : <div>Error</div>}
            </div>
        </div>
    )
}


