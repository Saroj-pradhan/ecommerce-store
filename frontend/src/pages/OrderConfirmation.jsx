import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom"
function OrderConfirmation() {
  const navigate = useNavigate();
  useEffect(()=>{
    const timer = setTimeout(()=>{
    navigate("/orderDetails/34")
    },4000)
    return()=> clearTimeout(timer);
  })
  const checkout = {
    orderItem: [
      {
        produtId: "ekeheif83482ejh32",
        name: "T-shirt",
        color: "red",
        size: "L",
        quantity: 0,
        price: 800,
        img: "https://picsum.photos/200/300?random=2",
      },
      {
        produtId: 1,
        name: "T-shirt",
        color: "blue",
        size: "M",
        quantity: 3,
        price: 1300,
        img: "https://picsum.photos/200/300?random=1",
      },
    ],
    orderId: 23455,
    paymentId: "pay_LkTg7e8s4f93hs",
    payment: "UPI",
    address: "123433, Bhramarapur, Ganjam, Odisha, nearby Jagannath Temple.",
    orderDateInfo: {
      orderDate: "2025-03-22",
      estimatedDeliveryDate: "2025-03-28",
    },
    paymentStatus: "Success",
  };

  return (
    <div>
      <div className="flex flex-col items-center  ">
        <h2 className="text-2xl text-green-700 font-bold my-4 ">
          Thank You For Your Order !
        </h2>
        <div className="h-fit  border-2  sm:w-[70%]  w-[100%] p-2 bg-gray-50 shadow-2xs border-gray-100 ">
          <div className="flex justify-between pb-4 border-b-2 border-gray-200">
            <div>
              <p className="font-semibold">Order Id {checkout.orderId}</p>
              <p>
                Order Date{" "}
                {new Date(
                  checkout.orderDateInfo.orderDate
                ).toLocaleDateString()}
              </p>
            </div>
            <p className="text-green-700">
              Estimated Delivery{" "}
              {new Date(
                checkout.orderDateInfo.estimatedDeliveryDate
              ).toLocaleDateString()}
            </p>
          </div>
          <div className="pb-4 border-b-2 border-gray-200 overflow-y-scroll max-h-[500px]">
            {checkout.orderItem.map((product) => (
              <div className="pt-4" key={product.produtId}>
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <img
                      className="h-[70px] w-[70px] rounded"
                      src={product.img}
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
              <p className="w-[70%]">{checkout.address}</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Payment</p>
              <p>{checkout.payment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
