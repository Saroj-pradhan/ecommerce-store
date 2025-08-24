import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import ProductReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice"
const store = configureStore({
    reducer: {
auth:authReducer,
products:ProductReducer,
cart:cartReducer
    },
});

export default store;