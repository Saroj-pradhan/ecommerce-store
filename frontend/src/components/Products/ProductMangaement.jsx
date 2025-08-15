import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
function ProductMangaement() {
    const [orders,setorders] = useState([
         {
    orderId: "ORD1001",
    name: "Men Printed Hoodie",
    Price: 2499,
    sku: "SKU-001",
    Status: "Processing"
  },
  {
    orderId: "ORD1002",
    name: "Women Floral Dress",
    Price: 1999,
    sku: "SKU-002",
    Status: "Shipping"
  },
  {
    orderId: "ORD1003",
    name: "Sports Running Shoes",
    Price: 3499,
    sku: "SKU-003",
    Status: "Delivered"
  },
  {
    orderId: "ORD1004",
    name: "Bluetooth Headphones",
    Price: 1599,
    sku: "SKU-004",
    Status: "Cancelled"
  },
  {
    orderId: "ORD1005",
    name: "Laptop Backpack",
    Price: 1299,
    sku: "SKU-005",
    Status: "Processing"
  },
  {
    orderId: "ORD1006",
    name: "Analog Wrist Watch",
    Price: 2199,
    sku: "SKU-006",
    Status: "Shipping"
  },
  {
    orderId: "ORD1007",
    name: "Gaming Keyboard",
    Price: 2899,
    sku: "SKU-007",
    Status: "Delivered"
  },
  {
    orderId: "ORD1008",
    name: "Smartphone Stand",
    Price: 499,
    sku: "SKU-008",
    Status: "Processing"
  }
    ])
    
    const handelDeleteProduct = (orderId)=>{
   setorders((prev)=>(
    prev.filter((order)=>(
        order.orderId !== orderId
    ))
   ))
    }

  return (
    <div>
        <div className='p-2'>
            <div>
                <h2 className='text-2xl font-semibold p-2'>ProductMangaement</h2>
            </div>
            <div className='w-full p-1 overflow-y-scroll overflow-x-scroll'>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-gray-300'>
                            <th className='text-left text-xl font-medium p-3 sm:p-2'>Name</th>
                            <th className='text-left text-xl font-medium p-3 sm:p-2'>Price</th>
                            <th className='text-left text-xl font-medium p-3 sm:p-2'>Sku</th>
                            <th className='text-left text-xl font-medium p-3 sm:p-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order)=>(
                           <tr className='border-gray-400 border-1 p-2'>
                            <td className='text-left pl-1'>{order.name}</td>
                            <td className='text-left'>{order.Price}</td>
                            <td className='text-left'>{order.sku}</td>
                            <td className='text-left'>
                                <div className='flex'>
                                <NavLink to={`/admin/productManage/${order.orderId}`} className='text-white bg-yellow-500 py-1 px-2 rounded m-1'>Edit</NavLink>
                                <button onClick={()=>handelDeleteProduct(order.orderId)} className='text-white bg-red-500 py-0.5 px-2 rounded m-1'>Delete</button>
                                </div></td>
                        </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default ProductMangaement