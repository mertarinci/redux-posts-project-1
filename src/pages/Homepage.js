import React from 'react'
import Controllers from "../features/posts/Controllers";
import Posts from "../features/posts/Posts";
import Navbar from "../features/navbar/Navbar";


export default function Homepage() {
    return (
        <div>

            <Navbar />
            <Controllers />
            <Posts />

        </div>
    )
}
