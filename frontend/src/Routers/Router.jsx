import React from 'react'
import { Routes, Route } from "react-router-dom";
import UserLayout from "../components/Layout/UserLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import CollectionPage from "../pages/CollectionPage";
import ProductDetail from "../components/Products/ProductDetail";
import Checkout from "../components/cart/Checkout";
import OrderConfirmation from "../pages/OrderConfirmation";
import OrderDetailsPage from "../pages/OrderDetailsPage";
import MyOrders from "../pages/MyOrders";
import AdminLayout from "../components/Admin/AdminLayout"
function Router() {
  return (
    <div>
   
        <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />}></Route>
          {/*i want to show the Home component by default when the path is "/" so i write  index*/}
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path="/collections/:collection" element={<CollectionPage/>}></Route>
          <Route path="collections/:Men/products/:id" element={<ProductDetail/>}/>
          <Route path="/products/:id" element={<ProductDetail/>}></Route>
          <Route path="/checkout" element={<Checkout/>}></Route>
          <Route path='/order-confirmation' element={<OrderConfirmation/>}></Route>
          <Route path="/orderDetails/:id" element={<OrderDetailsPage/>}></Route>
          <Route path="/my-orders" element={<MyOrders/>}></Route>
          <Route path="/admin" element={<AdminLayout/>}></Route>
        </Route>
      </Routes>

    </div>
  )
}

export default Router