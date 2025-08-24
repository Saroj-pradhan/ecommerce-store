import React from 'react'
import { RiDeleteBin3Line } from "react-icons/ri";
function CartContent() {
    const cardProduct = [{
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
    }
]
  return (
    <div>
        {cardProduct.map((Product,index)=>(
         <div key={index} className='flex  items-start p-2 justify-between'>
        <div className='flex items-center '>
            <img src={Product.img} alt={Product.name} className='w-20 h-24 mr-4 object-cover' />
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
        ))}
    </div>
  )
}

export default CartContent