import React, {useEffect} from 'react';
import  { useSelector, useDispatch } from 'react-redux';
import { getUsers } from './userSlice';
import {useParams} from "react-router-dom";

export default function User() {
  const dispatch = useDispatch();


  useEffect( () => {
    dispatch(getUsers())
  },[dispatch])

  const params = useParams();


  const user = useSelector(state => state.users.list)


  const publishUser = () => {

    if (user[0]){
      return user[params.userId-1]
    }
  }



  return (
    <div>{publishUser().name}</div>
  )
}


