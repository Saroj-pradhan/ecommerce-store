import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Backend URL
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const token = `Bearer ${localStorage.getItem("userToken")}`;

// fetch all orders
export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${backendUrl}/admin/orders`, {
        headers: { Authorization: token },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch all orders");
    }
  }
);

// update order status
export const updateOrdersStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/admin/orders/${id}`,
        { status },
        { headers: { Authorization: token } }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update order status");
    }
  }
);

// delete order
export const removeOrder = createAsyncThunk(
  "orders/remove",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${backendUrl}/admin/orders/${id}`, {
        headers: { Authorization: token },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete order");
    }
  }
);

// Slice
const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    loading: false,
    totalOrders: 0,
    totalSales: 0,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;
        state.totalSales = action.payload.reduce(
          (sum, order) => sum + (order.totalPrice || 0),
          0
        );
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update order status
      .addCase(updateOrdersStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrdersStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      })
      .addCase(updateOrdersStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // remove order
      .addCase(removeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter((order) => order._id !== action.payload);
        state.totalOrders = state.orders.length;
        state.totalSales = state.orders.reduce(
          (sum, order) => sum + (order.totalPrice || 0),
          0
        );
      })
      .addCase(removeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminOrderSlice.reducer;
