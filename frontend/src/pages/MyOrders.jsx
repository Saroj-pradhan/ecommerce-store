import React from 'react'

function MyOrders() {
      const orderInfo = [
        {
            imgs:"https://picsum.photos/500/500?random=15",
            orderId:173246872364,
            created:"22-12-2330",
            adress:"761209,india",
            item:1,
            price:4433,
            status:"ordered"

        },
        {
            imgs:"https://picsum.photos/500/500?random=13",
            orderId:173246872364,
            created:"22-12-2330",
            adress:"761209,india",
            item:3,
            price:4433,
            status:"delivered"

        },
         {
    imgs: "https://picsum.photos/500/500?random=14",
    orderId: 173246872365,
    created: "23-12-2330",
    adress: "761209, India",
    item: 2,
    price: 2999,
    status: "pending"
  },
  {
    imgs: "https://picsum.photos/500/500?random=18",
    orderId: 173246872366,
    created: "24-12-2330",
    adress: "761210, India",
    item: 1,
    price: 1299,
    status: "shipped"
  },
  {
    imgs: "https://picsum.photos/500/500?random=21",
    orderId: 173246872367,
    created: "25-12-2330",
    adress: "761211, India",
    item: 4,
    price: 5199,
    status: "delivered"
  },
  {
    imgs: "https://picsum.photos/500/500?random=29",
    orderId: 173246872368,
    created: "26-12-2330",
    adress: "761212, India",
    item: 2,
    price: 1899,
    status: "cancelled"
  },
  {
    imgs: "https://picsum.photos/500/500?random=33",
    orderId: 173246872369,
    created: "27-12-2330",
    adress: "761213, India",
    item: 5,
    price: 6750,
    status: "delivered"
  },
  {
    imgs: "https://picsum.photos/500/500?random=37",
    orderId: 173246872370,
    created: "28-12-2330",
    adress: "761214, India",
    item: 3,
    price: 3890,
    status: "shipped"
  }
    ]
  return (
    
    <div className='w-[100%] md:h-screen bg-gray-50 border-2 border-gray-100  '>
         <h1 className=' text-2xl font-semibold mb-4 p-3 '>My Orders</h1>
         <div className="max-h-[470px] overflow-y-auto">
         <table className="w-full table-auto border-collapse">
  <thead className="bg-gray-200 ">
    <tr>
      <th className="p-3 text-left ">Image</th>
      <th className="p-3 text-left hidden sm:inline-block md:inline-block lg:inline-block">Order ID</th>
      <th className="p-3 text-left hidden sm:inline-block md:inline-block lg:inline-block">Created Date</th>
      <th className="p-3 text-left hidden sm:inline-block md:inline-block lg:inline-block">Shipping Address</th>
      <th className="p-3 text-left ">Item</th>
      <th className="p-3 text-left ">Price</th>
      <th className="p-3 text-left ">Status</th>
    </tr>
  </thead>

  <tbody>
    {orderInfo.map((order, index) => (
      <tr key={index} className="border-b hover:bg-black hover:text-white">
        <td className="p-2">
          <img src={order.imgs} alt="product" className="w-16 h-16 object-cover" />
        </td>
        <td className="p-2 hidden sm:inline-block md:inline-block lg:inline-block">{order.orderId}</td>
        <td className="p-2 hidden sm:inline-block md:inline-block lg:inline-block">{order.created}</td>
        <td className="p-2 hidden sm:inline-block md:inline-block lg:inline-block">{order.adress}</td>
        <td className="p-2 ">{order.item}</td>
        <td className="p-2 ">₹{order.price}</td>
        <td className="p-2">{order.status}</td>
      </tr>
    ))}
  </tbody>
</table>
</div>
          </div>
         
  )
}

export default MyOrders