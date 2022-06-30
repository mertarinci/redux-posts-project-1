import React from 'react'
import { Link } from 'react-router-dom'

function Unauthorized() {
  return (
    <div className='text-center'>
        
        <h1 style={{textAlign:"center", padding:"100px"}}>You are unauthorized for this page.</h1>
        <Link to={"/"}><button className='btn btn-primary btn-lg '>Go back to Homepage</button></Link>
        
    </div>
  )
}

export default Unauthorized