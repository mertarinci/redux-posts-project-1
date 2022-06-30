import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../features/user/userSlice'

function TestPage() {


    const dispatch = useDispatch()

    const { users } = useSelector(state => state.users)


    useEffect(() => {
    dispatch(getUsers({query:""}))
    },[dispatch])
    


    

  return (
    <div>
        {users?.map(u => (<li key={u.userId}>{u.userId}-{u.username}</li>) )}
    </div>
  )
}

export default TestPage