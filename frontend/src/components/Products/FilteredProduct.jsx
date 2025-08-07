import React, { useState } from 'react'
import {  useSearchParams } from 'react-router-dom'
function FilteredProduct() {
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
       so
    </div>
  )
}

export default FilteredProduct