import React from 'react';
import  { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, increaseByAmount} from "./counterSlice";




export default function Counter() {

  const sayi = useSelector(state => state.counter.value);

  const dispatch = useDispatch();

  const arttir = () => {
    dispatch(increment())
  }

  const azalt = () => {
    dispatch(decrement())
  }

  const increaseByAmountt = () => {
    dispatch(increaseByAmount(20))
  }


  return (


    <div className='text-center'>
      {sayi}
      <hr></hr>
      <button onClick={() => azalt()} className='btn btn-danger'>-1</button>
      <button onClick={() => arttir()} className='btn btn-primary'>+1</button>
      <button onClick={() => increaseByAmountt()} className='btn btn-primary'>+10</button>
    </div>
  )
}


