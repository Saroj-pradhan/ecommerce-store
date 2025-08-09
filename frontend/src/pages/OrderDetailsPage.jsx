import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
function OrderDetailsPage() {
  const { id } = useParams();
  // const [orderDetail,setorderDetail] = useState(null);
  const orderDetail = {
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
    isPaid: true,
    orderId: "gyu333",
    createdAt: "22/12/2003",
    isDelivered: false,
    paymentMethod: "UPI",
    shippingMethod: "standard",
    address: { city: "Ganjam", stste: " Odisha" },
  };
  useEffect(() => {
    const mockdetail = {
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
      isPaid: true,
      orderId: "gyu333",
      createdAt: "22/12/2003",
      isDelivered: false,
      paymentMethod: "UPI",
      shippingMethod: "standard",
      address: { city: "Ganjam", stste: " Odisha" },
    };
    // setorderDetail(mockdetail);
  }, [id]);
  return (
    <div className="w-full flex justify-center px-4">
      <div className="flex flex-col items-center w-full max-w-4xl">
        {/* Heading */}
        <h2 className="text-2xl font-bold my-4">Order Details!</h2>

        {/* Order Info */}
        <div className="h-fit border-2 w-full p-4 bg-gray-50 shadow border-gray-100 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:justify-between pb-4 border-b-2 border-gray-200 gap-2">
            <div>
              <p className="font-semibold">Order Id: {orderDetail.orderId}</p>
              <p>
                Order Date:{" "}
                {new Date(orderDetail.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-green-700">Approved</p>
              <p
                className={`${
                  orderDetail.isDelivered
                    ? "text-green-700 bg-green-200 p-1 rounded"
                    : "text-orange-700 bg-orange-100 p-1 rounded"
                }`}
              >
                {orderDetail.isDelivered
                  ? "Delivered Succesfully"
                  : "Pending Delivery"}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between mt-4 gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">Shipping Info</h2>
              <p className="mb-1">Shipping method :</p>
              <p className="">
                {orderDetail.address.city},{orderDetail.address.stste}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-1">Payment Info</h2>
              <p className="mb-1">
                Payment method : {orderDetail.paymentMethod}
              </p>
              <p>
                Status :
                <span
                  className={`${
                    orderDetail.isPaid ? "text-green-700 " : "text-orange-700"
                  }`}
                >
                  {orderDetail.isPaid ? " Paid" : " unpaid"}
                </span>
              </p>
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
              {orderDetail.orderItem.map((order, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-black hover:text-white"
                >
                  <td className="p-2">
                    <img
                      src={order.img}
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
      </div>
    </div>
  );
}

export default OrderDetailsPage;
