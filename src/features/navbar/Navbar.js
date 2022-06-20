import React from 'react';
import { BouncingBalls, Coin, FadingDots } from 'react-cssfx-loading/lib';
import { useSelector } from 'react-redux';

export default function Navbar() {


    const postStatus = useSelector(state => state.posts.status)



    const statusBar = () => {
    if (postStatus ==="failed"){
        return <FadingDots color="#FF0000" width="50px" height="50px" duration="2s" />
    }

    if(postStatus === "success"){
        return <Coin color="#7CFC00" width="50px" height="50px" duration="2s" />
    }

    if(postStatus === "loading"){

        return <BouncingBalls color="#0000CD" width="20px" height="20px" duration="2s" />
    }
    }


  return (
    <div className='nav navbar bg-light text-center d-flex justify-content-space-between p-4' style= {{height: "120px"}}>
        <div className='navbar-brand'>BBC Posts</div>
        <div><h2>Posts Homepage</h2>
        </div>
        <div className='p-2'>
            {statusBar()}
        </div>
    </div>
  )
}
