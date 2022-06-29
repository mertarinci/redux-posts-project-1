import React, { useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

export default function CreatePost() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [postImage,setImage] = useState("");

    // const token = (JSON.parse(localStorage.getItem("user")))


    const [token,setToken] = useState((JSON.parse(localStorage.getItem("user"))))

    const handleSubmit = async (e) => {

        e.preventDefault();



        await axios.post("http://localhost:4000/api/posts/newPost", {
            title: title,
            content: content,
            postImage:postImage
        }, {headers: {
            "Authorization": `Bearer ${token.access_token}`
        }})
            .then(res => {if(res.status === 200){



                document.getElementById("title").value=""
                document.getElementById("content").value=""
                document.getElementById("image").value=""
                document.getElementById("postSuccess").innerHTML = `
                <h2><span style="color: green;" >Post sent successfully.</span> You can return to <span style="color: red;"><a href="/">Homepage.</a></span></h2>
                `

                Swal.fire({
                    icon: 'success',
                    title: 'Post sent successfully!',
                    html:"Congrats!",
                    timer: 2000,
                    timerProgressBar: true})

            }})
            .catch(err => {
                if(err.response.status !== 200){

                    Swal.fire({
                        icon: 'warning',
                        title: 'Oups, there is a mistake!',
                        html:"An error accured, Please check your post!",
                        timer: 2000,
                        timerProgressBar: true})

                }
            })


    }

    const showPreview = () => {

 

        if (title !== "") {
            return (<div className='text-center'>
                <h3 className='text-center m-3'>Post Preview</h3>
                <div className="card " style={{ width: "18rem", marginLeft: "500px" }}>
                <img  src={postImage} className="card-img-top" alt="imagepreview"/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{content}</p>
                    </div>
                </div>
            </div>)
        }
    }

    return (


        <div className='container text-center' style={{ marginTop: "150px" }}>
            <Link to={"/"}> <button className='btn btn-primary'>Back to Homepage</button></Link>

            <div id='postSuccess' className='mb-5'></div>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
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


        
    )
}
