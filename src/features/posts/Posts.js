import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from './postSlice';


export default function Posts() {

    const posts = useSelector(state => state.posts.list);


    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getPosts({ limit: "" }))
    }, [dispatch])


    return (


        <div className='container mt-5'>
            <div className='row'>

                {posts.map(post => (

                    <div className='col-3'>
                        <div key={post.id} className="card" style={{ width: "18rem" }}>
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
    )
}


