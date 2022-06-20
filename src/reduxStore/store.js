import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../features/counter/counterSlice'
import postSlice from '../features/posts/postSlice'

export default configureStore({
  reducer: {
    counter: counterSlice,
    posts : postSlice
  },
})