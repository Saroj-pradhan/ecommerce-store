import {useState} from 'react'
import { IoMdClose } from "react-icons/io";
import CartContent from '../cart/CartContent';
import { useNavigate } from 'react-router-dom';
function Cart({cartOpen,cartToggle}) {
  const nevigate = useNavigate();
    const nevigateToCheckout = ()=>{
  nevigate("/checkout");
    }
  return (
    <div className={`border-2 bg-white h-full w-3/4 sm:w-1/2 md:w-2/7 z-50 fixed top-0 right-0 transform transition-transform duration-300 flex flex-col  ${cartOpen?"translate-x-0":"translate-x-full"}`}>
        <div className='flex justify-end p-4'>
            <button  className='' onClick={cartToggle}><IoMdClose className='h-6 w-6'/></button>
        </div>
        <div className='flex-grow p-2 overflow-y-auto'>
       <h2 className='text-xl mb-3'>Your Cart</h2>
       <CartContent/>
        </div>
        <div className='p-2'>
           <button onClick={nevigateToCheckout} className='text-xl w-full p-1.5 rounded-lg bg-black  text-white font-semibold hover:bg-gray-800'> Checkout </button>
        </div>
        <p  className='text-center tracking-tighter text-xs mb-2'>shipping taxes & discountes calculated at checkout</p>
    </div>
  )
}

export default Cart