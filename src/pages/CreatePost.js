import React, { useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2'

export default function CreatePost() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();



        await axios.post("http://localhost:4000/api/posts/newPost", {
            title: title,
            content: content
        })
            .then(res => {if(res.status === 200){

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
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{content}</p>
                    </div>
                </div>
            </div>)
        }
    }


    return (
        <div className='container text-center' style={{ marginTop: "300px" }}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Post Title</label>
                    <input onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" id="title" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Content</label>
                    <input onChange={(e) => setContent(e.target.value)} type="text" className="form-control" id="content" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {showPreview()}
        </div>
    )
}
