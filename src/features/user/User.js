import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from './userSlice';
import { useParams, Link } from "react-router-dom";
import { getPosts } from '../posts/postSlice';

export default function User() {
  const dispatch = useDispatch();
  const params = useParams();


  const user = useSelector(state => state.users.list);
  const posts = useSelector(state => state.posts.list);


  useEffect(() => {
    dispatch(getUsers())
    dispatch(getPosts({ query: `userId=${params.userId}` }))
  }, [dispatch])



  const publishUser = () => {

    if (user[0]) {
      return user[params.userId - 1]
    } else {
      return delete publishUser[" "]
    }
  }


  const publishPost = () => {

    if (posts[0]) {
      return posts.map(p => (
        <div key={p.id} className="card col-4" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{p.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Post ID: {p.id}</h6>
            <p className="card-text">{p.body}</p>
            <div class="card-footer">
              {publishUser().name}
            </div>

          </div>
        </div>))
    } else {
      return delete publishPost[" "]
    }
  }


  const userNavBar = () => {

    return (<div className='nav navbar bg-light text-center d-flex justify-content-space-between p-4' style={{ height: "120px" }}>
      <Link to="/" style={{ textDecoration: 'none' }}><div className='navbar-brand' href="">BBC Posts</div></Link>
      <div><h2>{publishUser().name}'s Posts</h2></div>
      <div></div>
    </div>)
  }



  const leftSide = () => {
    return (
      <div className='col-4'>
        <ul class="list-group p-2">
          <li class="list-group-item active text-center">{publishUser().name}</li>
          <li class="list-group-item">Username: {publishUser().username}</li>
          <li class="list-group-item">Email: {publishUser().email}</li>
          <li class="list-group-item">Phone: {publishUser().phone}</li>
          <li class="list-group-item">Website: {publishUser().website}</li>
        </ul>
      </div>
    )
  }

  const rightSide = () => {
    return (
      <div className='col-8'>
        <div className='row p-2'>
          {publishPost()}

        </div>
      </div>
    )
  }


  return (
    <div>{userNavBar()}
      <div className='container'>
        <div className='row'>
          {leftSide()}
          {rightSide()}
        </div>
      </div>
    </div>

  )
}
