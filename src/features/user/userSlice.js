import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const getUsers = createAsyncThunk("users/getUsers", 
    async () => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users`)
        return response.data})



const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        loading : null,
        selectedUser : ""
    },
    extraReducers:{
        [getUsers.pending]: (state, action) => {
            state.status = "loading"
        },
        [getUsers.fulfilled]: (state,action) => {
            state.users = action.payload
            state.status = "success"
        },
        [getUsers.rejected]: (state, action) => {
            state.status = "failed"
        }
    }
})

export default userSlice.reducer;



