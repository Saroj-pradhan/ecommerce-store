import React from 'react'
import {NavLink} from 'react-router-dom'
function FeaturedCollection() {
  return (

         <div className='flex flex-col justify-center items-center sm:flex-row md:flex-row w-full h-full md:h-[450px] lg:h-[450px] mt-6 px-2.5 md:px-0 lg:px-0  md:ml-0 md:mr-0'>
            <div className='flex-col h-full min-h-[370px] justify-center content-center items-center md:w-[50%] p-3.5 bg-green-100 w-[100%]'>
                <p className='font-semibold mb-2'>Comfort and Style</p>
                <h1 className='text-2xl md:text-4xl font-bold mb-2'>Apparel made for your <br></br>everyday life</h1>
                <p className='text-gray-500 mb-2 pb-4'>Lorem ipsum rem cum facilis temporibus  ducimus? Dolorem quidem porro perferendis fuga accusamus, rerum expedita reprehenderit, tempore maiores laboriosam hic.</p>
                <NavLink to="/collections/all"
              className={`px-14 py-2 mt-1.5 border-2 mb-2 text-white rounded bg-black`}>
                shop now
              </NavLink>
            </div>
            <div className='md:w-[50%] w-[100%] md:h-[450px] bg-green-600 '>
                <img className='w-full h-full object-cover' src="https://picsum.photos/500/500?random=13" alt="" srcset="" />
            </div>
         </div>
    
  )
}

export default FeaturedCollection