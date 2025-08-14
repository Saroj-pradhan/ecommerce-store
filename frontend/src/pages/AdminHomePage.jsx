import React, { useState } from 'react'

function AdminHomePage() {
    const [userdata,setuserdata] = useState([{
        orderId:"123dkd328763287jsdbfhj",
        user:"saroj prad",
        totalPrice:3443,
        status:"paid"
    },
    {
        orderId:"123dkd328763287jsdbfhj",
        user:"saroj prad",
        totalPrice:3443,
        status:"paid"
    }
  ])
  return (
    <div>
      <div className='w-full'>
        <h2 className='text-2xl mt-2 mb-2 font-semibold'>Admin Dashboard</h2>
        <div className='flex w-full flex-col sm:flex-row'>
        <div className='sm:w-[33%] w-full shadow-lg h-[100px] p-2 m-1 mb-1 border-b-2'><h3 className='text-xl font-semibold '>Revenue</h3><p>$400</p></div>
        <div className='sm:w-[33%] w-full shadow-lg h-[100px] p-2 m-1 mb-1 border-b-2'><h3 className='text-xl font-semibold '>Total Products</h3><p>4</p></div>
        <div className='sm:w-[33%] w-full shadow-lg h-[100px] p-2 m-1 mb-1 border-b-2'><h3 className='text-xl font-semibold '>Total Orders</h3><p>40</p></div>
        </div>
         <h2 className='text-2xl mt-2'>Recent Orders</h2>
          <div className='w-full mt-3 overflow-y-scroll overflow-x-scroll'>
           <table className='w-full p-2 '>
             <thead>
                <tr className='bg-gray-300 w-full p-2'>
                    <td className='uppercase text-left p-2'>Order Id</td>
                    <td className='uppercase text-left p-2'>User</td>
                    <td className='uppercase text-left p-2'>Total Price</td>
                    <td className='uppercase text-left p-2'>Status</td>
                </tr>
            </thead>
            <tbody>
               
                 { userdata.map((order)=>(
                  <tr className='p-2 bg-gray-50'>
                    <td className='p-2'>{order.orderId}</td>
                    <td className='p-2'>{order.user}</td>
                    <td className='p-2'>{order.totalPrice}</td>
                    <td className='p-2'>{order.status}</td> 
                  </tr>
                 ))}
            
            </tbody>
           </table>
          </div>
      </div>

    </div>
  )
}

export default AdminHomePage