import React from 'react'
import { RiDeleteBin3Line } from "react-icons/ri";
import {fetchCart} from "../../Redux/slices/cartSlice";
import {useSelector,useDispatch} from "react-redux"
import { useEffect } from 'react';
function CartContent() {
    const dispatch = useDispatch();
    const {carts ,loading , error} = useSelector((state)=>state.cart);
    useEffect( ()=>{
         const userId = JSON.parse(localStorage.getItem("userInfo") || "{}")?._id || null;
        const guestId = localStorage.getItem("guestId") || null;
        console.log(userId,guestId);
     dispatch(fetchCart({userId,guestId}))
        
    },[dispatch])
  return (
    <div>
       {  carts?.products?.length>0?(carts.products.map((Product,index)=>(
         <div key={index} className='flex  items-start p-2 justify-between'>
        <div className='flex items-center '>
            <img src={Product.images} alt={Product.name} className='w-20 h-24 mr-4 object-cover' />
            <div>
                <h3>{Product.name}</h3>
                <p className='text-gray-500'>Size :{Product.size} | Color:{Product.color}</p>
                <div className='flex mt-1'>
                   <button className="border rounded px-1.5 py-0.5 text-sm font-medium">+</button>
                   <p className='mx-4'>{Product.quantity}</p>
                   <button className="border rounded px-1.5 py-0.5 text-sm font-medium">-</button>

                </div>
            </div>
        </div>
        <div> 
            <p>{Product.price.toLocaleString()}</p> 
             <button><RiDeleteBin3Line className='h-5 w-6 text-red-500 mt-2'/></button>
        </div>
         </div>
        ))):<p>Loading</p>
    }
    </div>
  )
}

export default CartContent