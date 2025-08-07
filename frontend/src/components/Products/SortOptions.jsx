import React from 'react'
import { useSearchParams } from 'react-router-dom'
function SortOptions() {
  const[searchParams,setSearchParams] = useSearchParams();
  const handelsortselection = (e)=>{
console.log("sort",e.target.value);
searchParams.set('sortby',e.target.value)
  setSearchParams(searchParams);
  }
  return (
   <div>

      <div className='flex justify-between items-center'>
<h3 className='text-2xl'>All Collection</h3>
<select name="" onClick={ handelsortselection} className='border-2 border-gray-800 w-[40%] sm:w-[200px] sm:py-2 sm:px-1 outline-gray-200 focus:outline-gray-300'>
    <option  value="" > sort By </option>
    <option  value="popular">Sort by: Popularity</option>
    <option  value="LTH">Sort by: Low To High</option>
    <option  value="HTL">Sort by: High To Low</option>
</select>
    </div>

   </div>
  )
}

export default SortOptions