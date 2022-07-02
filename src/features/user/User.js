/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from './userSlice';
import { useParams, Link } from "react-router-dom";
import { getPosts } from '../posts/postSlice';
import ReadMoreReact from 'read-more-react/dist/components/ReadMoreReact';
import Swal from "sweetalert2"
import axios from "axios"



export default function User(props) {

  const dispatch = useDispatch();
  const params = useParams();

  const { users } = useSelector(state => state.users);
  const { posts } = useSelector(state => state.posts);
  const loggedUser = useSelector(state => state.auth.user);

  const status = useSelector(state => state.users.status)
  const postStatus = useSelector(state => state.users.status)

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImage, setImage] = useState("");





  useEffect(() => {
    dispatch(getUsers({ query: "" }))
    dispatch(getPosts())

  }, [dispatch, params.username])



  const ownerPost = loggedUser?.data.username === params.username ? true : false


  const showPreview = () => {



    if (title !== "") {
      return (<div className='text-center'>
        <h3 className='text-center m-3'>Post Preview</h3>
        <div className="card " style={{ width: "18rem" }}>
          <img src={postImage} className="card-img-top" alt="imagepreview" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{content}</p>
          </div>
        </div>
      </div>)
    }
  }

  const editButton = (e) => {

    const editPost = document.getElementById("editPost")
    const title = document.getElementById("title")
    const content = document.getElementById("content")
    const image = document.getElementById("image")
    const editPostId = document.getElementById("editPostId")

    editPost.style.display = "inline-block"


    const postId = parseInt(e.target.getAttribute("data-id"))

    const clickedPost = posts?.filter(post => post._id === postId)

    title.value = clickedPost[0].title
    content.value = clickedPost[0].content
    image.value = clickedPost[0].postImage
    editPostId.value = clickedPost[0]._id

  }

  const token = JSON.parse(localStorage.getItem("user"))


  const deleteButton = async (e) => {

    const postId = parseInt(e.target.getAttribute("data-id"))

    await axios.delete(`http://localhost:4000/api/posts/${postId}/delete`, {
      headers: {
        "Authorization": `Bearer ${token.access_token}`
      }
    }).then(async res => {
      if (res.status === 200) {

        await Swal.fire({
          icon: 'success',
          title: 'Post deleted successfully!!',
          timer: 1000,
          timerProgressBar: true
        })

        window.location.reload()

      }
    })
      .catch(err => {
        if (err.response.status !== 200) {


          Swal.fire({
            icon: 'warning',
            title: 'Oups, there is a mistake!',
            html: "An error accured, Please check your editted post!",
            timer: 2000,
            timerProgressBar: true
          })

        }
      })

  }


  const handleSubmit = async () => {

    const editPostId = parseInt(document.getElementById("editPostId").value)

    await axios.put(`http://localhost:4000/api/posts/${editPostId}/edit`, {
      title: title,
      content: content,
      postImage: postImage
    }, {
      headers: {
        "Authorization": `Bearer ${token.access_token}`
      }
    })
      .then(async res => {
        if (res.status === 200) {


          document.getElementById("editPost").display = "none"

          await Swal.fire({
            icon: 'success',
            title: 'Post updated!',
            html: "Congrats!",
            timer: 2000,
            timerProgressBar: true
          })

          window.location.reload()

        }
      })
      .catch(err => {
        if (err.response.status !== 200) {

          Swal.fire({
            icon: 'warning',
            title: 'Oups, there is a mistake!',
            html: "An error accured, Please check your editted post!",
            timer: 2000,
            timerProgressBar: true
          })

        }
      })


  }



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

              <div style={{ display: "none" }} id='editPost' className='p-2 text-center'>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <h2>Edit Your Post</h2>
                    <label className='form-label'>Post ID</label>
                    <input type="text" className="form-control" id="editPostId" readOnly />

                    <label className="form-label">Post Title</label>
                    <input onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" id="title" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea onChange={(e) => setContent(e.target.value)} type="text" className="form-control" id="content" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image (URL Only)</label>

                    <input onChange={(e) => setImage(e.target.value)} type="text" className="form-control" id="image" />
                    <div id="imageHelp" className="form-text">**If you added a valid URL, your picture will be shown down below.</div>

                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>

                {showPreview()}



              </div>


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
                              {ownerPost ? (<div id='postButtons'>
                                <button data-id={post._id} onClick={(e) => deleteButton(e)} id='deletePost' className='btn btn-danger'>Delete Post</button>
                                <button data-id={post._id} id='editPost' className='btn btn-warning' onClick={(e) => editButton(e)}>Edit Post</button></div>) : (<></>)}
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
