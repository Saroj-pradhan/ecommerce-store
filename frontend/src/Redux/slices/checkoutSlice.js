import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
//create CheckOut
export const createCheckout = createAsyncThunk("/checkout/create", 
    async (checkoutData,{rejectWithValue})=>{
        console.log("reachslice");
     try {
        const {data} =await axios.post(`${import.meta.env.VITE_BACKEND_URL}/checkout`,checkoutData,{
            
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`
            }
        })
        return data;
     } catch (error) {
        return rejectWithValue(error.response);
     }
    }
) 
//
const checkoutSlice = createSlice({
    name:"checkout",
    initialState:{
        checkout:null,
        loading:false,
        error:null
    }
    ,
    reducers:{},
    extraReducers:(builder)=>{
  builder
  .addCase(createCheckout.pending,(state)=>{
   state.loading=true;
   state.error = null;
  })
  .addCase(createCheckout.fulfilled,(state,action)=>{
   state.loading=false;
   state.checkout = action.payload;
   state.error = null;
  })
  .addCase(createCheckout.rejected,(state,action)=>{
   state.loading=false;
   state.error = action.payload?.message;
  })
    }
})
export default checkoutSlice.reducer