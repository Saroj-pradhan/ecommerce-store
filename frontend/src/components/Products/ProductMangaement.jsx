import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {fetchAdminProducts} from "../../Redux/slices/adminProductSlice"
function ProductMangaement() {
  const dispatch = useDispatch();
  useEffect(()=>{
  dispatch(fetchAdminProducts());
  },[]);
  const {products , loading,error} = useSelector((state)=>state.adminProduct);
    
    
    const handelDeleteProduct = (orderId)=>{
   setorders((prev)=>(
    prev.filter((order)=>(
        order.orderId !== orderId
    ))
   ))
    }
   console.log(products,"prddd");
   console.log("load",loading)
   if(loading) return <p>loading ....</p>
  return (
    <div>
        <div className='p-2'>
            <div>
                <h2 className='text-2xl font-semibold p-2'>Product Management</h2>
            </div>
            <div className='w-full p-1  overflow-x-scroll'>
              {products ?  <table className='w-full overflow-y-scroll max-h-[500px]'>
                    <thead>
                        <tr className='bg-gray-300'>
                            <th className='text-left text-xl font-medium p-3 sm:p-2'>Name</th>
                            <th className='text-left text-xl font-medium p-3 sm:p-2'>Price</th>
                            <th className='text-left text-xl font-medium p-3 sm:p-2'>Sku</th>
                            <th className='text-left text-xl font-medium p-3 sm:p-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='w-full h-[500p]'>
                        {products?.usersProduct?.map((product)=>(
                           <tr className='border-gray-400 border-1 p-2'>
                            <td className='text-left pl-1'>{product.name}</td>
                            <td className='text-left'>{product.price}</td>
                            <td className='text-left'>{product.sku}</td>
                            <td className='text-left'>
                                <div className='flex'>
                                <NavLink to={`/admin/productManage/${product._id}`} className='text-white bg-yellow-500 py-1 px-2 rounded m-1'>Edit</NavLink>
                                <button onClick={()=>handelDeleteProduct(product._id)} className='text-white bg-red-500 py-0.5 px-2 rounded m-1'>Delete</button>
                                </div></td>
                        </tr>
                        ))}
                        
                    </tbody>
                </table>:  <p>loading ....</p>}
            </div>
        </div>
    </div>
  )
}

export default ProductMangaement