import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
//load cart from storage 
const loadcartfromStorage = ()=>{
  const storecart = localStorage.getItem("cartItem");
  return storecart?JSON.parse(storecart):{products:[]};
}
// save the cart
const savecarttoStorage = (cart)=>{
 localStorage.setItem("cartItem",JSON.stringify(cart));
}
//fetch cart for user/guest
export const fetchCart = createAsyncThunk("/cart/fetchCart",async ({userId,guestId},{rejectWithValue})=>{
  try {
    const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cart`,
       { params:{userId,guestId} }
    )
  return data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
    }
)

//fetch add product to Cart
export const AddToCart = createAsyncThunk("/cart/addTocart",async ( {guestId,userId,productId,quantity,size,color},{rejectWithValue})=>{
    try {
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/cart`,
           {guestId,userId,productId,quantity,size,color});
        
        return data;
    } catch (error) {
         return rejectWithValue(error.response);
    }
})
// update Cart Item on Quantity
export const updateQuantity = createAsyncThunk("/cart/updateQuantity",async ( {guestId,productId,quantity,size,color,userId},{rejectWithValue})=>{
    try {
        const {data} = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/cart`,
           {guestId,userId,productId,quantity,size,color}
        );
        return data;
    } catch (error) {
         return rejectWithValue(error.response);
    }
})
// remove an item from cart
export const RemoveItemCart = createAsyncThunk("/cart/removeItem",async ({ userId,guestId,productId,quantity,size,color},{rejectWithValue})=>{
    try {
        const {data} =await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/cart`,{
            data:{
                userId,guestId,productId,quantity,size,color
            }
        })
        return data ;
    } catch (error) {
        return rejectWithValue(error.response);
    }
})
// merge guest and user Cart
export const mergeUsers = createAsyncThunk("cart/mergeUsers",async ({guestId,user},{rejectWithValue})=>{
    const userToken = localStorage.getItem("userToken");
    try {
         const {data} =await axios.post(`${import.meta.env.VITE_BACKEND_URL}/cart/merge`,{
          guestId,user  
     },{
        headers:{
            Authorization:`Bearer ${userToken}`
        }
     })
     return data;
    } catch (error) {
      return  rejectWithValue(error.response.data);
        }
}) 

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        carts:loadcartfromStorage(),
        loading:false,
        error:null
    },
    reducers:{
    clearCart:(state)=>{
        state.carts = {Products:[]};
   localStorage.removeItem("cartItem");
    }
    },
    extraReducers:(builder)=>{
   builder
   .addCase(fetchCart.pending,(state)=>{
    state.loading=true;
    state.error=null;
   })
    .addCase(fetchCart.fulfilled,(state,action)=>{
    state.loading=false;
    state.carts = action.payload;
    state.error= null;
    savecarttoStorage(action.payload);
   })
    .addCase(fetchCart.rejected,(state,action)=>{
    state.loading=false;
    state.error=action.payload || "failed to fetch cart details";
   })
// AddToCart
   .addCase(AddToCart.pending,(state)=>{
    state.loading=true;
    state.error=null;
   })
    .addCase(AddToCart.fulfilled,(state,action)=>{
    state.loading=false;
    state.carts = action.payload;
    state.error= null;
    savecarttoStorage(action.payload);
   })
    .addCase(AddToCart.rejected,(state,action)=>{
    state.loading=false;
    state.error=action.payload || "failed to add to cart";
   })
   //updateQuantity
   .addCase(updateQuantity.pending,(state)=>{
    state.loading=true;
    state.error=null;
   })
    .addCase(updateQuantity.fulfilled,(state,action)=>{
    state.loading=false;
    state.carts = action.payload;
    state.error= null;
    savecarttoStorage(action.payload);
   })
    .addCase(updateQuantity.rejected,(state,action)=>{
    state.loading=false;
    state.error=action.payload || "failed to update quantity of Item";
   })
// RemoveItemCart
   .addCase(RemoveItemCart.pending,(state)=>{
    state.loading=true;
    state.error=null;
   })
    .addCase(RemoveItemCart.fulfilled,(state,action)=>{
    state.loading=false;
    state.carts = action.payload;
    state.error= null;
    savecarttoStorage(action.payload);
   })
    .addCase(RemoveItemCart.rejected,(state,action)=>{
    state.loading=false;
    state.error=action.payload || "failed to remove Item";
   })
   //mergeUsers
   .addCase(mergeUsers.pending,(state)=>{
    state.loading=true;
    state.error=null;
   })
    .addCase(mergeUsers.fulfilled,(state,action)=>{
    state.loading=false;
    state.carts = action.payload;
    state.error= null;
    savecarttoStorage(action.payload);
   })
    .addCase(mergeUsers.rejected,(state,action)=>{
    state.loading=false;
    state.error=action.payload || "failed to merge cart";
   })
    }
})
export const {clearCart} = cartSlice.actions;
export default cartSlice.reducer