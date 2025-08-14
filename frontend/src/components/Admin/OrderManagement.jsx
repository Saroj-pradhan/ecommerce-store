import React,{useState} from 'react'

function OrderManagement() {
    const [order, setorder] = useState([{
        orderId:"dkjfdjkfs556",
        customer:"saroj",
        totalPrice:56366,
        Status:"Processing"
    }]);
    const changetodelivered = (orderId)=>{
        setorder((prev)=>(
           prev.map((orders)=>(
   orders.orderId === orderId?({...orders,Status:"Delivered"}):orders
            ))
        ))
    }
  return (
    <div className='sm:p-3'>
        <div>
            <div>
          <h2 className='text-2xl font-semibold mb-3 '>Order Management</h2>
            </div>
            <div className='w-full overflow-y-scroll overflow-x-scroll'>
                <table className='w-full overflow-y-scroll overflow-x-scroll'>
                   <thead className='bg-gray-300 p-1'>
                    <tr>
                      <th className='uppercase text-left p-3 sm:p-0.5'>order id</th>
                      <th className='uppercase text-left p-3 sm:p-0.5'>customer</th>
                      <th className='uppercase text-left p-3 sm:p-0.5'>total price</th>
                      <th className='uppercase text-left p-3 sm:p-0.5'>status</th>
                      <th className='uppercase text-left p-3 sm:p-0.5'>Actions</th>
                    </tr>
                   </thead>
                   <tbody>
                   
                         {order.map((ord)=>(
                             <tr className='mt-3'>
                              <td className='text-left text-xl mt-2 p-3 sm:p-0.5'>{ord.orderId}</td>
                              <td className='text-left text-xl mt-2 p-3 sm:p-0.5'>{ord.customer}</td>
                              <td className='text-left text-xl mt-2 p-3 sm:p-0.5'>{ord.totalPrice}</td>
                              <td className='text-left'>
                                <select name="status" id="status" value={ord.Status} onChange={(e)=>(
                                    setorder((prev)=>(
                                         prev.map((orders)=>(
   orders.orderId === ord.orderId?({...orders,Status:e.target.value}):orders
            ))
                                    ))
                                )} className='border-2 border-gray-600 rounded py-0.5 px-1.5 mt-2'>
                                    <option className='bg-orange-100' value="Processing">Processing</option>
                                    <option className='bg-orange-300' value="Shipping">Shipping</option>
                                    <option className='bg-green-500' value="Delivered">Delivered</option>
                                    <option className='bg-red-400' value="Cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td className='text-left p-3 sm:p-0.5'><button onClick={()=>changetodelivered(ord.orderId)} className='bg-green-500 text-white px-2 py-1  rounded mt-2'>Mark as Delivered</button></td>
                              </tr>
                        ))}
                  
                   </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default OrderManagement