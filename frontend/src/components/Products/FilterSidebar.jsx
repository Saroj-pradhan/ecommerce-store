import React from 'react'
import { FaFilter } from "react-icons/fa";
function Filtersidebar() {
    
  return (
       <div className=" w-full h-full flex flex-col p-1 sm:p-0">
      
      <div className="flex  items-center  text-xl pt-5 sm:pt-0.5 ">
           <FaFilter /><p className="uppercase ">Filters</p>
         </div>

      <div className="mt-5 flex flex-col p-4 space-y-1 border-2 border-gray-200 ">
        <h3 className="text-s uppercase">categories</h3>
        <label><input type="checkbox" value="topwear" /> Topwear</label>
        <label><input type="checkbox" value="buttomwear"/> Buttomwear</label>
      </div>

      <div className="mt-5 flex flex-col p-4 space-y-1 border-2 border-gray-200 ">
        <h3 className="text-s uppercase">gender</h3>
        <label><input type="checkbox" value="men" /> Men</label>
        <label><input type="checkbox" value="women" /> Women</label>
        <label><input type="checkbox" value="kids" /> Kids</label>
      </div>
  
        <div className="mt-5 flex flex-col p-4 space-y-1 border-2 border-gray-200 ">
           <h3 className="text-s uppercase">size</h3>
           <label className="uppercase"><input type="checkbox" value="xs" /> XS</label>
           <label className="uppercase"><input type="checkbox" value="s"/> s</label>
           <label className="uppercase"><input type="checkbox" value="m"/> m</label>
           <label className="uppercase"><input type="checkbox" value="l"/> l</label>
           <label className="uppercase"><input type="checkbox" value="xl"/> xl</label>
           <label className="uppercase"><input type="checkbox" value="xll"/> xll</label>
        
       </div>
    </div>
  )
}

export default Filtersidebar