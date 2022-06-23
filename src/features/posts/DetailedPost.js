/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import { getUsers } from '../user/userSlice';
import { useDispatch } from 'react-redux';

export default function DetailedPost() {

  const [post, setPost] = useState([])

  const params = useParams();

  const dispatch = useDispatch();


  const getPosts = async () => { await axios.get("https://babacanpostbe.herokuapp.com/api/posts/getAllPosts").then(res => setPost(res.data.data)) }

  useEffect(() => {
    getPosts();
    dispatch(getUsers())
  }, [dispatch])

  // const publishUser = () => {

  //   if (users[0]) {
  //     return users[post[params.postId].userId - 1]
  //   } else {
  //     return delete publishUser[" "]
  //   }
  // }





  return (

    <div style={{backgroundColor: "#808080",height:"1080px"}}>
      

      {post.map(p => {
        if (parseInt(p._id) === parseInt(params.postId)) {
          return (
            <div>
            <div className='nav navbar bg-light text-center d-flex justify-content-space-between p-4' style={{ height: "120px" }}>
              <Link to="/" style={{ textDecoration: 'none' }}><div className='navbar-brand' href="">BBC Posts</div></Link>
              <div></div>
              <div></div>
            </div>


            <div className='mt-5 p-2 text-center container'>
              <img style={{width:"600px",height:"400px"}} src={p.postImage} alt='postImage'></img>
            </div>
            <hr></hr>

            <div className='container mt-5 text-center'>
              <h1 className='p-2'>{p.title}</h1>
              <hr></hr>

              <h3 className='p-2 text-center'>{p.content}</h3>
            </div>

            </div>
          )
        }
      })}

    </div>
  )
}
