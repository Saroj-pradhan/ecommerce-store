import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// fetch user orders
export const fetchUserOrders = createAsyncThunk("orders/fetchOrder", 
 
    async (_,{rejectWithValue})=>{
         console.log(localStorage.getItem("userToken"),"kk");
     try {
        const {data} =await axios.get(`${import.meta.env.VITE_BACKEND_URL}/orders/my-order`,{
            headers:{
                authorization:`Bearer ${localStorage.getItem("userToken")}`
            }
        })
           console.log(localStorage.getItem("userToken","hayyy"))
          
        return data;
     } catch (error) {
        return rejectWithValue(error.response);
     }
    }
);
// fetch user orders by Id
export const fetchOrderDetails = createAsyncThunk("orders/fetchOrderDetails", 
    async ({orderId},{rejectWithValue})=>{
        console.log(`Bearer ${localStorage.getItem("userToken")}`)
     try {
        const {data} =await axios.get(`${import.meta.env.VITE_BACKEND_URL}/orders/${orderId}`,{
            headers:{
                authorization:`Bearer ${localStorage.getItem("userToken")}`
            }
        })
         console.log(orderId,"orderId8")
        return data;
     } catch (error) {
        console.log(error,"errsli");
        return rejectWithValue(error.response);
     }
    }
); 
const orderSlice = createSlice({
    name:"orders",
    initialState:{
        orders:[],
        totalOrders:0,
        orderDetails:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
   builder
   .addCase(fetchUserOrders.pending,(state)=>{
state.loading=true;
state.error = null;
   })
    .addCase(fetchUserOrders.fulfilled,(state,action)=>{
state.loading=false;
state.error = action.null;
state.orders = action.payload;
state.totalOrders = action.payload?.length || 0;
   })
   .addCase(fetchUserOrders.rejected,(state,action)=>{
state.loading=false;
state.error = action.payload;
   })
   //fetchOrderDetails
    .addCase(fetchOrderDetails.pending,(state)=>{
state.loading=true;
state.error = null;
   })
    .addCase(fetchOrderDetails.fulfilled,(state,action)=>{
state.loading=false;
state.error = null;

console.log(action.payload,"paylaod");
state.orderDetails = action.payload;
   })
   .addCase(fetchOrderDetails.rejected,(state,action)=>{
state.loading=false;
console.log(action.payload,"eror")
state.error = action.payload?.message;
   })
    }
})
export default orderSlice.reducer;
