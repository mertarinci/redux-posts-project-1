import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const getUsers = createAsyncThunk("users/getUsers", 
    async () => {
        return await axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then(res => res.data)})



const userSlice = createSlice({
    name: "users",
    initialState: {
        list: [],
        status : null,
        selectedUser : ""
    },
    extraReducers: {
        [getUsers.pending]: (state, action) => {
            state.status = "loading"
        },
        [getUsers.fulfilled]: (state, {payload}) => {
            state.list = payload
            state.status = "success"
        },
        [getUsers.rejected]: (state, action) => {
            state.status = "failed"
        }
    }
})

export default userSlice.reducer;



