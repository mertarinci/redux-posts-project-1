import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const getUsers = createAsyncThunk("users/getUsers",
    async ({ query }) => {
        const response = await axios.get(`http://localhost:4000/api/user/getAllUsers${query}`)

        // if(response.data.pagination.next){
        //     console.log("ye")
        // }else{
        //     console.log("no")
        // }
        // console.log((response.data.pagination.next))


        return response.data
    })


export const getAllUsers = createAsyncThunk("users/getAllUsers",
    async () => {
        const response = await axios.get("http://localhost:4000/api/user/getAllUsers")

        return response.data
    })



const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        loading: null,
        status: "idle",
        selectedUser: "",
        count: "",
        allUsers:[]
    },
    extraReducers: {
        [getUsers.pending]: (state, action) => {
            state.status = "loading"
        },
        [getUsers.fulfilled]: (state, action) => {
            state.count = action.payload.totalCount
            state.users = action.payload.data
            state.status = "success"
        },
        [getUsers.rejected]: (state, action) => {
            state.status = "failed"
        },
        [getAllUsers.pending]: (state, action) => {
            state.status = "loading"
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.count = action.payload.totalCount
            state.allUsers = action.payload.data
            state.status = "success"
        },
        [getAllUsers.rejected]: (state, action) => {
            state.status = "failed"
        }
    }
})

export default userSlice.reducer;



