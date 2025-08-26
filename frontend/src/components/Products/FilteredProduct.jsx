import React, { useState } from 'react'
import {  useSearchParams ,NavLink} from 'react-router-dom'
function FilteredProduct({products}) {
    const [searchParams,setsearchParams] = useSearchParams();
    const [filters , setfilters] = useState({
        category:"",
        gender:"",
        material:[],
        brand:[],
        size:[],
        minPrice:0,
        maxPrice:133
    });
    const [priceRange , setpriceRange] = useState([0,100]);
     
  return (
    <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4  mt-4 gap-4 gap-y-6">
        {products.map((Product) => (
          <NavLink to={`products/${Product._id}`} >
            <div className="overflow-hidden">
              <img
                className="h-[270px] w-full object-cover hover:scale-105 transition-all"
                draggable="false"
                src={Product.images[0].url}
                alt={Product.images[0].altText}
              />
            </div>
            <p className="mt-1.5 text-gray-500">{Product.name}</p>
            <p>₹{Product.price}</p>
          </NavLink>
        ))}
      </div>
    </div>
   
  )
}

export default FilteredProduct