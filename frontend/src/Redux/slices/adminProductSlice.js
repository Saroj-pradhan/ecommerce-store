import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Backend URL
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const token = `Bearer ${localStorage.getItem("userToken")}`;

// fetch admin products
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${backendUrl}/admin/products`, {
        headers: { Authorization: token },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// create product
export const createProduct = createAsyncThunk(
  "adminProducts/create",
  async (productInfo, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/products/create`,
        productInfo,
        { headers: { Authorization: token } }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// update existing product
export const updateProduct = createAsyncThunk(
  "adminProducts/update",
  async ({ id, productInfo }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/products/${id}`,
        productInfo,
        { headers: { Authorization: token } }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// delete product
export const removeProduct = createAsyncThunk(
  "adminProducts/remove",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/products/${id}`, {
        headers: { Authorization: token },
      });
      return data ;
    } catch (err) {
      return rejectWithValue(err.response?.data || "failde to delete product");
    }
  }
);

// Slice
const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch products
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })

      // create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })

      // delete product
      .addCase(removeProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload.id
        );
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
  },
});

export default adminProductSlice.reducer;
