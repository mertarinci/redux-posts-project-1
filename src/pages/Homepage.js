import React from 'react'
import Controllers from "../features/posts/Controllers";
import Posts from "../features/posts/Posts";
import Navbar from "../features/navbar/Navbar";
import Authors from '../features/user/Authors';


export default function Homepage() {
    return (
        <div>

            <Navbar />
            <Controllers />

            <div className='row'>
            <div className='col-3'><Authors/></div>
            <div className='col-9'><Posts /></div>
            </div>

        </div>
    )
}
