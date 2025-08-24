import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const userfromStorage = localStorage.getItem("userInfo")? localStorage.getItem("userInfo"):null;

const intialGuestId = localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId",intialGuestId);

const initialState = {
    user:userfromStorage,
    guestId:intialGuestId,
    loading:false,
    error:null
};

// Async Thunk for user login
export const loginUser = createAsyncThunk("auth/loginUser",async (userData,{rejectWithValue})=>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`,
            userData
        );
        localStorage.setItem("userInfo",JSON.stringify(response.data.user));
        localStorage.setItem("userToken",response.data.token);
        return response.data.user;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
// registration of user
export const registerUser = createAsyncThunk("auth/registerUser",async (userData,{rejectWithValue})=>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`,
            userData
        );
        localStorage.setItem("userInfo",JSON.stringify(response.data?.user));
        localStorage.setItem("userToken",response.data.token);
        return response.data.user;
    } catch (error) {
        console.log(error.response)
        return rejectWithValue(error.response.data);
    }
});
// slice
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
     logout:(state)=>{
        state.user = null;
        state.guestId =  `guest_${new Date().getTime()}`;
        localStorage.removeItem("userInfo");
        localStorage.removeItem("userToken");
        localStorage.setItem("guestId",state.guestId);
     },
     generateNewGuestId:(state)=>{
        state.guestId = `guest_${new Date().getTime()}`;
        localStorage.setItem("guestId",state.guestId);
     },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            state.user= action.payload;//may have error
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?.message;
        })
        .addCase(registerUser.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.error =null;
            state.user= action.payload;
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?.message;
        })
    }
})

export const {logout,generateNewGuestId} = authSlice.actions;
export default authSlice.reducer;