import axios from "axios";
import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
export const fetchProductsByfilter = createAsyncThunk("/products/filter" , 
   
    async ({
    collection,
    sortby,
    gender,
    material,
    brand,
    size,
    minPrice,
    maxPrice,
    category
    },{rejectWithValue})=>{
    try {
         console.log("reach344");
        const query =new URLSearchParams();
    //   if(collection) query.append("collection",collection);
      if (sortby) query.append("sortby", sortby);
      if (gender) query.append("gender", gender);
      if (material) query.append("material", material);
      if (brand) query.append("brand", brand);
      if (size) query.append("size", size);
      if (minPrice) query.append("minPrice", minPrice);
      if (maxPrice) query.append("maxPrice", maxPrice);
      if (category) query.append("category", category);

      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/filter?${query.toString()}`);
      console.log(response.data,"data");
      return response.data;
    } catch (error) {
              return rejectWithValue(
        error.response?.data || "Failed to fetch products"
      );

    }
});

// fetch single  product  id
export const fetchproductById = createAsyncThunk("products/fetchProductDetails", 
    async (id,{rejectWithValue})=>{
try {
    console.log("aaaaaaaaaaa")
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`);
    console.log(response.data,"lll")
    return response.data ; 
} catch (error) {
    return rejectWithValue(error?.data || "failed to fetch product by id") ;
}
}) 

// fetch update Product

const UpdateProduct = createAsyncThunk("products/fetchupdateProducts", 
    async ({id , productDetail },{rejectWithValue})=>{
try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`,{productDetail},
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`,
            
        }
        }
    );
    return response.data; 
} catch (error) {
    return rejectWithValue(error?.data || "failed to update product") ;
}
}) 

// fetch similar Product

const fetchSimilarProduct = createAsyncThunk("products/fetchSimilarProducts", 
    async (id,{rejectWithValue})=>{
try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/similar/${id}`);
    return response.data ;
} catch (error) {
    return rejectWithValue(error?.data || "failed to fetch product by id") ;
}
}) 

// slice 
const ProductsSlice = createSlice({
    name :"products",
    initialState:{
        products:[],
        selectedProducts:[],
        similarProducts:[],
        loading:false,
        error:null,
        filters:{
            sortby:"",collection:"",color:"" ,category:"",gender:"",material:"",brand:"",size:"",minPrice:"",maxPrice:"",search:"", limit:""
        }

    },
    reducers:{
        setFilters:(state,action)=>{
            state.filters = {...state.filters , ...action.payLoad}
        },
        clearFilters:(state)=>{
            state.filters = { sortby:"",collection:"",color:"" ,category:"",gender:"",material:"",brand:"",size:"",minPrice:"",maxPrice:"",search:"", limit:""}
        },
    },
        extraReducers:(builder)=>{
      builder
      .addCase(fetchProductsByfilter.pending,(state)=>{
      state.loading=true,
      state.error=null
      })
       .addCase(fetchProductsByfilter.fulfilled,(state,action)=>{
      state.loading=false,
      console.log("chek",action.payload)
      state.products = Array.isArray(action.payload)? action.payload:[],
      state.error=null
      })
      .addCase(fetchProductsByfilter.rejected,(state,action)=>{
      state.loading=false,
      state.error=action.error?.message || "failed fetch to filter the Product"
      })
      //fetch by Id
      .addCase(fetchproductById.pending,(state)=>{
      state.loading=true;
      state.error=null
      })
       .addCase(fetchproductById.fulfilled,(state,action)=>{
      state.loading=false;
       
      state.selectedProducts = action.payload? [action.payload]:[];
      state.error=null;
      })
      .addCase(fetchproductById.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error?.message || "failed to fetch the Product By Id";
      })
      //update Product
      .addCase(UpdateProduct.pending,(state)=>{
      state.loading=true,
      state.error=null
      })
       .addCase(UpdateProduct.fulfilled,(state,action)=>{
      state.loading=false;
      const updatedProducts = action.payload;
      const index = state.products.findIndex((prod)=>prod._id === updatedProducts);
      if(index !== -1) state.products[index] = updatedProducts;
      state.error=null;
      })
      .addCase(UpdateProduct.rejected,(state,action)=>{
      state.loading=false,
      state.error=action.error?.message || "failed to fetch the Updated Product"
      })
      //similar Product
      .addCase(fetchSimilarProduct.pending,(state)=>{
      state.loading=true,
      state.error=null
      })
       .addCase(fetchSimilarProduct.fulfilled,(state,action)=>{
      state.loading=false;
       state.similarProducts = Array.isArray(action.payload)?action.payload:[];
     
       })
      .addCase(fetchSimilarProduct.rejected,(state,action)=>{
      state.loading=false,
      state.error=action.error?.message || "failed to fetch the similar Product"
      })
     }
    
})
export const {setFilters,clearFilters} = ProductsSlice.actions;
export default ProductsSlice.reducer;