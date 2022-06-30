/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from './userSlice';
import { useParams, Link } from "react-router-dom";
import { getPosts } from '../posts/postSlice';
import ReadMoreReact from 'read-more-react/dist/components/ReadMoreReact';



export default function User(props) {

  const dispatch = useDispatch();
  const params = useParams();

  const { users } = useSelector(state => state.users);
  const { posts } = useSelector(state => state.posts);
  const  loggedUser  = useSelector(state => state.auth.user);

  const status = useSelector(state => state.users.status)
  const postStatus = useSelector(state => state.users.status)


  useEffect(() => {
    dispatch(getUsers({ query: "" }))
    dispatch(getPosts())
    
  }, [dispatch, params.username])




  // const isOwner = () => {
  //     if(loggedUser.data.username === params.username){
  //       return true
  //      }else{
  //       return false
  //      }
  // }


  const ownerPost = loggedUser?.data.username === params.username ? true:false





  const userPage = function () {

     if (status === "success" && postStatus === "success") {
       const user = users?.filter(user => user.username === params.username)[0]
      return (
        <div>

          
          <div className='nav navbar bg-light text-center d-flex justify-content-space-between p-4' style={{ height: "120px" }}>
            <Link to="/" style={{ textDecoration: 'none' }}><div className='navbar-brand' href="">BBC Posts</div></Link>
            <div><h2>{user.username}'s Posts</h2></div>
            <div></div>
          </div>


          <div className='row'>

            <div className='col-3'>
              <ul className="list-group p-2">
                <li className="list-group-item active text-center">{user.username}</li>
                <li className="list-group-item">Email: {user.email}</li>
                <li className="list-group-item">ID: {user.userId}</li>

              </ul>
            </div>
            <div className='col-9'>
              <div className='row'>
                {posts?.map(post => {
                  if (post.user === user.userId) {
                    return (

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
                            <p>Author:{user.username} </p>
                            <div className="card-footer text-muted text-center">
                              <Link to={`/posts/${post._id}`}><button className='btn btn-success'>Haberin detayları</button></Link> 
                                {ownerPost ? (<div id='postButtons'><button  id='deletePost' className='btn btn-danger'>Delete Post</button>
                              <button  id='editPost' className='btn btn-warning'>Edit Post</button></div>):(<></>)}


                            </div>
                          </div>
                        </div>
                      </div>)
                  }
                })}
              </div>

            </div>
          </div>

        </div>

      )
    }
  }






  return (
    <div>
      {userPage()}

    </div>


  )
}
