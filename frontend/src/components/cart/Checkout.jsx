import React, { useState } from 'react'

function Checkout() {
    const cart ={
      cardProduct : [{
        produtId:1,
        name:"T-shirt",
        color:"blue",
        size:3,
        quantity:3,
        price:1300,
        img:"https://picsum.photos/200/300?random=1"
    },
    {
        produtId:2,
        name:"T-shirt",
        color:"red",
        size:6,
        quantity:0,
        price:800,
        img:"https://picsum.photos/200/300?random=2"
    },
    
],total:5000
    }
    const [shippingAdress,setshippingAdress] = useState("");
  return (
    <div >
        
        <div className='flex items-center justify-center mt-3'>
            <div className='w-[50%] bg-red-500 border-2 h-[400px]'>
                <h3 className='text-2xl uppercase mb-3'>Checkout</h3>
                <p className='text-lg mb-2'>Contact Details</p>
              
            </div>
            <div className='w-[50%] bg-red-500 border-2 h-[400px]'></div>
        </div>

    </div>
  )
}

export default Checkout