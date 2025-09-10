import React, { useEffect } from "react";
import {useNavigate , useParams} from "react-router-dom";
import { fetchOrderDetails } from "../Redux/slices/orderSlice";
import { useDispatch ,useSelector} from "react-redux";

function OrderConfirmation() {
  const dispatch = useDispatch();
  const {orderDetails} = useSelector((state)=>state.orders);
  const navigate = useNavigate();
  const {id} = useParams();
  console.log(id,"idididid")
  useEffect(()=>{
    
     dispatch(fetchOrderDetails({orderId:id}));
     
    const timer = setTimeout(()=>{
    navigate(`/orderDetails/${id}`)
    },5000)
    return()=> clearTimeout(timer);
  },[])
  return (
    <div>
      {orderDetails ? (<div className="flex flex-col items-center  ">
        <h2 className="text-2xl text-green-700 font-bold my-4 ">
          Thank You For Your Order !
        </h2>
        <div className="h-fit  border-2  sm:w-[70%]  w-[100%] p-2 bg-gray-50 shadow-2xs border-gray-100 ">
          <div className="flex justify-between pb-4 border-b-2 border-gray-200">
            <div>
              <p className="font-semibold">Order Id {id}</p>
              <p>
                Order Date{" "}
                {new Date(
                  orderDetails.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
            <p className="text-green-700">
              Estimated Delivery{" "}
              {new Date(
                orderDetails.createdAt
              ).toLocaleDateString()}
            </p>
          </div>
          <div className="pb-4 border-b-2 border-gray-200 overflow-y-scroll max-h-[500px]">
            {orderDetails.orderItems.map((product) => (
              <div className="pt-4" key={product.produtId}>
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <img
                      className="h-[70px] w-[70px] rounded"
                      src={product.images}
                      alt={product.name}
                    />
                    <div>
                      <p className="text-black">{product.name}</p>
                      <p className="text-gray-700">
                        {product.size} | {product.color}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-black">${product.price}</p>
                    <p>Qty:{product.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between  mt-2">
            <div>
              <p className="font-semibold mb-1">Delivery</p>
              <p className="mb-1">{orderDetails.shippingAddress.postalCode},{orderDetails.shippingAddress.city}</p>
              <p>
              {orderDetails.shippingAddress.address},{orderDetails.shippingAddress.country}
              </p>
              <p className="w-[70%]">{orderDetails.shippingAddress.address}</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Payment</p>
              <p>{(orderDetails.paymentMethod).toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>): <p>wait sometime it is loading ...</p>}
    </div>
  );
}

export default OrderConfirmation;
