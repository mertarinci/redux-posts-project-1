import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getAllUsers, getUsers } from './userSlice'

function Authors() {

    const dispatch = useDispatch()


    const {users} = useSelector(state => state.users);
    const {user} = useSelector(state => state.auth);
    const count = useSelector(state => state.users.count);


    const [query, setQuery] = useState({
        limit:8,
        page:1
    })

    const {limit} = query





    useEffect(() => {
        dispatch(getUsers({query:`?limit=${query.limit}&page=${query.page}`}))
        dispatch(getAllUsers())

   }, [dispatch, query])


   const arrCount = Math.ceil(count/query.limit)
   const arr = [...Array(arrCount).keys()]




  return (
    <div className='text-center'>
            {user ? ( <Link style={{marginRight:"115px"}} to={"/allUsers"}><button className='btn btn-warning p-2'>All Users</button></Link>): (<></>)}
        <ul className="list-group" style={{ width: "300px", marginLeft: "20px", fontSize: "1.5rem" }}>
            <h2 className='p-2'>Authors</h2>
            {
                users.map((user) => (
                    <Link key={user.userId} style={{ textDecoration: 'none' }} to={`/user/${user.username}`}>
                        <li onMouseOver={(e) => e.target.classList.add("bg-info")} onMouseLeave={(e) => e.target.classList.remove("bg-info")} className="list-group-item">{user.username}</li>
                    </Link>
                ))
            }

        </ul>

        <div style={{marginRight:"100px",marginTop:"30px"}}>
        {arr.map(b => (
            <button onClick={() => setQuery({page:b+1,limit})} key={b} className='btn btn-primary m-1'>{b+1}</button>
        ))}
        <p >Total Pages: {Math.ceil(count / query.limit)}</p>
        </div>

    </div>


  )
}

export default Authors