/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import { getUsers } from '../user/userSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function DetailedPost() {

  const [post, setPost] = useState([]) // A B = []

  const params = useParams();

  const dispatch = useDispatch();

  const { users } = useSelector(state => state.users);

  const getPosts = async () => { await axios.get("https://jsonplaceholder.typicode.com/posts").then(res => setPost(res.data)) }

  useEffect(() => {
    getPosts();
    dispatch(getUsers())
  }, [dispatch])

  const publishUser = () => {

    if (users[0]) {
      return users[post[params.postId].userId - 1]
    } else {
      return delete publishUser[" "]
    }
  }





  return (

    <div style={{backgroundColor: "#808080",height:"1080px"}}>
      

      {post.map(p => {
        if (parseInt(p.id) === parseInt(params.postId)) {
          return (
            <div>
            <div className='nav navbar bg-light text-center d-flex justify-content-space-between p-4' style={{ height: "120px" }}>
              <Link to="/" style={{ textDecoration: 'none' }}><div className='navbar-brand' href="">BBC Posts</div></Link>
              <div><h2>{p.id} - {p.title.toUpperCase()}</h2></div>
              <div></div>
            </div>


            <div className='mt-5 p-2 text-center container'>
              <h4 className='text-center'>Author: {publishUser().name}</h4>
              <img src='https://picsum.photos/800/400' alt='img'></img>
            </div>
            <div className='container mt-5 text-cente'>
              <h1 className='p-2'>{p.body}</h1>
              <hr></hr>
              <h3 className='p-2'>{p.body}</h3>
            </div>

            </div>
          )
        }
      })}

    </div>
  )
}
