import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const getPosts = createAsyncThunk("posts/getPosts", 
    async ({query}) => {
        return await axios.get(`https://jsonplaceholder.typicode.com/posts?${query}`)
        .then(res => res.data)})



const postsSlice = createSlice({
    name: "posts",
    initialState: {
        list: [],
        status : null
    },
    extraReducers: {
        [getPosts.pending]: (state, action) => {
            state.status = "loading"
        },
        [getPosts.fulfilled]: (state, {payload}) => {
            state.list = payload
            state.status = "success"
        },
        [getPosts.rejected]: (state, action) => {
            state.status = "failed"
        },
    }
})

export default postsSlice.reducer;


