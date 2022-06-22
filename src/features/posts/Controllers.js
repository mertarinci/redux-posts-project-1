import React from 'react';
import { Link } from 'react-router-dom';

export default function Controllers() {

    

    // const getPostsById = (userId) => {

    //   return dispatch(getPosts({query: `userId=${userId}`}))
    // }



  return (
    <div className='container my-5 text-center'>
        <div className='row'>
            {/* <div className='col-3'><button onClick={() => getPostsByAmount(4)} className='btn btn-primary '>4 Post</button></div>
            <div className='col-3'><button onClick={() => getPostsByAmount(8)} className='btn btn-warning '>8 Post</button></div>
            <div className='col-3'><button onClick={() => getPostsByAmount(16)} className='btn btn-danger '>16 Post</button></div> */}
            <div className='col-4'><Link to={"/posts/createPost"}><button className='btn btn-success btn-lg'>Add New Post</button></Link></div>
            <div className='col-4'><Link to={"/register"}><button className='btn btn-warning btn-lg'>Register</button></Link></div>
            <div className='col-4'><Link to={"/login"}><button className='btn btn-primary btn-lg'>Login</button></Link></div>
        </div>
        {/* <div className='container mx-auto my-5 text-center'>
        <div className='row'>
          <div className='col-2'><button onClick={() => getPostsById(1) } className='btn btn-secondary'>1</button></div>
          <div className='col-2'><button onClick={() => getPostsById(2) } className='btn btn-secondary'>2</button></div>
          <div className='col-2'><button onClick={() => getPostsById(3) } className='btn btn-secondary'>3</button></div>
          <div className='col-2'><button onClick={() => getPostsById(4) } className='btn btn-secondary'>4</button></div>
          <div className='col-2'><button onClick={() => getPostsById(5) } className='btn btn-secondary'>5</button></div>

          </div>

          <div className='row mt-2'>
          <div className='col-2'><button onClick={() => getPostsById(6) } className='btn btn-secondary'>6</button></div>
          <div className='col-2'><button onClick={() => getPostsById(7) } className='btn btn-secondary'>7</button></div>
          <div className='col-2'><button onClick={() => getPostsById(8) } className='btn btn-secondary'>8</button></div>
          <div className='col-2'><button onClick={() => getPostsById(9) } className='btn btn-secondary'>9</button></div>
          <div className='col-2'><button onClick={() => getPostsById(10) } className='btn btn-secondary'>10</button></div>
          </div>
        </div> */}
        </div>
  )
}
