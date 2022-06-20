import React from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from './postSlice';

export default function Controllers() {

    const dispatch = useDispatch();

    const getPostsByAmount =  (amount) => {

        return dispatch(getPosts({limit : amount}))
    }



  return (
    <div className='container my-5 text-center'>
        <div className='row'>
            <div className='col-4'><button onClick={() => getPostsByAmount(4)} className='btn btn-primary btn-lg'>4 Post</button></div>
            <div className='col-4'><button onClick={() => getPostsByAmount(8)} className='btn btn-warning btn-lg'>8 Post</button></div>
            <div className='col-4'><button onClick={() => getPostsByAmount(16)} className='btn btn-danger btn-lg'>16 Post</button></div>
        </div>
        </div>
  )
}
