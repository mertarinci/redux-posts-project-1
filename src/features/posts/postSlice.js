import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const getPosts = createAsyncThunk("posts/getPosts", 

    async () => {

        try {
            let url = `https://babacanpostbe.herokuapp.com/api/posts/getAllPosts`
            const response = await axios.get(url)
            return response.data.data

        }catch(err){
            console.log(err)
        }})



const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        status : "idle"
    },
    extraReducers(builder){
        builder
        .addCase(getPosts.pending, (state,action)=> {
            state.status = "loading"
        })
        .addCase(getPosts.fulfilled, (state,action)=> {
            state.status = "success"
            state.posts = action.payload
        })
        .addCase(getPosts.rejected, (state,action)=> {
            state.status = "failed"
        })
        
    }
})

export default postsSlice.reducer;


