import React from 'react'
import {HiOutlineUser ,HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2"
import {NavLink} from 'react-router-dom'
import SearchBar from './SearchBar'
function Navbar() {
  return (
    <div>
      <nav className=' flex items-center justify-between px-4 py-2 bg-white'>
     <div>
      <NavLink to="/" className={"text-2xl font-bold"}>SnapCart</NavLink>
     </div>
     <div className='gap-1.5 hidden sm:block'>
<NavLink className={"px-2"}>MEN</NavLink>
<NavLink className={"px-2"}>WOMEN</NavLink>
<NavLink className={"px-2"}>TOP-WEAR</NavLink>
<NavLink className={"px-2"}>BOTTOM-WEAR</NavLink>
     </div>
     <div className='flex items-center'>
      <NavLink to="/profile" className={"px-1.5 "}> <HiOutlineUser className='h-6 w-6'/></NavLink>
      <button className='relative px-1.5'>
        <HiOutlineShoppingBag className='h-5 w-5'/>
        <span className=' absolute -top-1  text-white bg-red-500 rounded-full px-1.5 py-0.5 text-xs'>4</span>
      </button>
      <button className='px-2 h-6 w-6'><SearchBar/></button>
      <button className={"px-1.5 md:hidden"}> <HiBars3BottomRight className='h-6 w-6'/></button>
     </div>
      </nav>
    </div>
  )
}

export default Navbar