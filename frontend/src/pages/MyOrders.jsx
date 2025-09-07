import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../Redux/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";

function MyOrders() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  // Flatten orderItems + attach parent order info
  const ord = [];
  if (orders) {
    orders.forEach((order) => {
      order.orderItems.forEach((item) => {
        ord.push({
          ...item,
          orderId: order._id,
          created: order.createdAt,
          address: `${order.shippingAddress.city}, ${order.shippingAddress.country}`,
          status: order.status,
        });
      });
    });
  }

  const handelorderDetail = (orderId) => {
    navigate(`/products/${orderId}`);
  };

  return (
    <div className="w-[100%] md:h-screen bg-gray-50 border-2 border-gray-100">
      <h1 className="text-2xl font-semibold mb-4 p-3">My Orders</h1>

      {ord.length > 0 ? (
        <div className="max-h-[470px] overflow-y-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left hidden sm:table-cell">Order ID</th>
                <th className="p-3 text-left hidden sm:table-cell">Created Date</th>
                <th className="p-3 text-left hidden sm:table-cell">Shipping Address</th>
                <th className="p-3 text-left">Item</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {ord.map((order, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-black hover:text-white cursor-pointer"
                  onClick={() => handelorderDetail(order.orderId)}
                >
                  <td className="p-2">
                    <img
                      src={order.images}
                      alt="product"
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="p-2 hidden sm:table-cell">{order.orderId}</td>
                  <td className="p-2 hidden sm:table-cell">
                    {new Date(order.created).toLocaleDateString()}
                  </td>
                  <td className="p-2 hidden sm:table-cell">{order.address}</td>
                  <td className="p-2">{order.quantity}</td>
                  <td className="p-2">₹{order.price}</td>
                  <td className="p-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="p-4 text-gray-500">No orders found.</p>
      )}
    </div>
  );
}

export default MyOrders;
