import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from './userSlice';
import { useParams, Link } from "react-router-dom";



export default function User(props) {

  const dispatch = useDispatch();
  const params = useParams();

  const { users } = useSelector(state => state.users);

  const status = useSelector(state => state.users.status)


  useEffect(() => {
    dispatch(getUsers({query: ""}))
  }, [dispatch, params.username])





  // if(users.loading === "success"){
  //   user = users.filter(user => user.username === params.username)[0]
  // }



  const userPage = function () {

    if (status === "success") {
      const user = users.filter(user => user.username === params.username)[0]
      return (
        <div>
          <div className='nav navbar bg-light text-center d-flex justify-content-space-between p-4' style={{ height: "120px" }}>
            <Link to="/" style={{ textDecoration: 'none' }}><div className='navbar-brand' href="">BBC Posts</div></Link>
            <div><h2>{user.username}'s Posts</h2></div>
            <div></div>
          </div>


          <div className='row'>

            <div className='col-4'>
              <ul className="list-group p-2">
                <li className="list-group-item active text-center">{user.username}</li>
                <li className="list-group-item">Email: {user.email}</li>
                <li className="list-group-item">ID: {user.userId}</li>

              </ul>
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
