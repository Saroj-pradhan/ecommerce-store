import React, { useEffect, useState } from "react";
import { useParams, Link , useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {fetchOrderDetails} from "../Redux/slices/orderSlice"
function OrderDetailsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const {orderDetails} = useSelector((state)=>state.orders);
   const { id } = useParams();
   useEffect(()=>{
    
   dispatch(fetchOrderDetails({orderId:id}));
    
   },[])
   console.log(orderDetails,"details")

 
  // if(orders){
  //    orderDetails = orders.filter((order)=> id === order._id);
  //   // setorderDetail(orderDetails);
  //   console.log(orderDetails)
  // }
  function handelProduct(productId){
  navigate(`/products/${productId}`);
  }
  return (
    <div className="w-full flex justify-center px-4">
      {orderDetails? (<div className="flex flex-col items-center w-full max-w-4xl">
        {/* Heading */}
        <h2 className="text-2xl font-bold my-4">Order Details!</h2>

        {/* Order Info */}
        <div className="h-fit border-2 w-full p-4 bg-gray-50 shadow border-gray-100 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:justify-between pb-4 border-b-2 border-gray-200 gap-2">
            <div>
              <p className="font-semibold">Order Id: {id}</p>
              <p>
                Order Date:{" "}
                {orderDetails.createdAt.split("T")[0]}
              </p>
            </div>
            <div>
              <p className="text-green-700">Approved</p>
              <p
                className={`${
                  orderDetails.isDelivered
                    ? "text-green-700 bg-green-200 p-1 rounded"
                    : "text-orange-700 bg-orange-100 p-1 rounded"
                }`}
              >
                {orderDetails.isDelivered
                  ? "Delivered Succesfully"
                  : "Pending Delivery"}
              </p>
              <p>Current Status : {orderDetails.status}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between mt-4 gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">Shipping Info</h2>
              <p className="mb-1">{orderDetails.shippingAddress.postalCode},{orderDetails.shippingAddress.city}</p>
              <p className="">
              {orderDetails.shippingAddress.address},{orderDetails.shippingAddress.country}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-1">Payment Info</h2>
              <p className="mb-1">
                Payment method : {(orderDetails.paymentMethod).toUpperCase()}
              </p>
              <p className="mb-1">
                Status :
                <span
                  className={`${
                    orderDetails.isPaid ? "text-green-700 " : "text-orange-700"
                  }`}
                >
                  {orderDetails.isPaid ? " Paid" : " unpaid"}
                </span>
              </p>
              <p>Total : {orderDetails.totalPrice}</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="pb-4 border-b-2 border-gray-200 max-h-[500px] overflow-y-auto overflow-x-auto w-full mt-4">
          <table className="min-w-[600px] border-collapse w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left p-2">Product</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Unit Price</th>
                <th className="text-left p-2">Quantity</th>
                <th className="text-left p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.orderItems.map((order, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-black hover:text-white"
                  onClick={()=>handelProduct(order.productId)}
                >
                  <td className="p-2">
                    <img
                      src={order.images}
                      alt="product"
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="p-2 text-blue-700">{order.name}</td>
                  <td className="p-2">₹{order.price}</td>
                  <td className="p-2">{order.quantity}</td>
                  <td className="p-2">₹{order.price * order.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <Link to={"/my-orders"}>Back To My Order</Link>
        </div>
      </div>) : (<p>error in loading.....</p>) }
    </div>
  );
}

export default OrderDetailsPage;
