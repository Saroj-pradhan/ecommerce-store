import { useState } from 'react'
import {HiOutlineUser ,HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2"
import { IoMdClose } from "react-icons/io";
import {NavLink} from 'react-router-dom'
import SearchBar from './SearchBar'
import Cart from '../Layout/Cart'
function Navbar() {
  const [cartOpen , setcartOpen] = useState(false);
  const [navDrawerOpen ,setnavDrawerOpen] = useState(false);
  
    const cartToggle = ()=>{
        setcartOpen((pr)=>!pr);
    }
    const handelnavToggle =()=>{
      setnavDrawerOpen((pr)=>!pr);
    }
  return (
    <div>
      <nav className=' flex items-center justify-between px-4 py-2 bg-white'>
     <div>
      <NavLink to="/" className={"text-2xl font-bold"}>SnapCart</NavLink>
     </div>
     <div className='gap-1.5 hidden sm:block'>
         <NavLink to="/collections/all?gender=Men" className={"px-2"}>MEN</NavLink>
         <NavLink to="/collections/all?gender=Women" className={"px-2"}>WOMEN</NavLink>
         <NavLink to="/collections/all?category=Top+Wear" className={"px-2"}>TOP-WEAR</NavLink>
         <NavLink to="/collections/all?category=Bottom+Wear" className={"px-2"}>BOTTOM-WEAR</NavLink>
     </div>
     <div className='flex items-center'>
      <NavLink to="/admin" className={"text-xs px-1 sm:px-2 rounded bg-black text-white"}>Admin</NavLink>
      <NavLink to="/profile" className={"px-1.5 "}> <HiOutlineUser className='h-6 w-6'/></NavLink>
      <button className='relative px-1.5' onClick={cartToggle}>
        <HiOutlineShoppingBag className='h-5 w-5'/>
        <span className=' absolute -top-1  text-white bg-red-500 rounded-full px-1.5 py-0.5 text-xs'>4</span>
      </button>
      <div className='px-2 h-6 w-6'><SearchBar/></div>
      <button onClick={handelnavToggle} className={"px-1.5 md:hidden"}> <HiBars3BottomRight className='h-6 w-6'/></button>
     </div>
      </nav>
      <Cart cartOpen={cartOpen} cartToggle={cartToggle}/>
     {/* mobile nav drawer */}
     <div className={`fixed top-0 left-0 bg-white h-full w-2/4  z-50 sm:w-1/4 transform transition-transform duration-300  ${navDrawerOpen?"translate-x-0":"-translate-x-full"}`}>
      <div onClick={handelnavToggle} className='flex justify-end p-4'>
        <IoMdClose className='h-6 w-6'/>
        </div>
      <div className='p-4'>
        <h2 className='text-2xl'>Menu</h2>
       
    <nav className='space-y-3.5 mt-1.5'>
   <NavLink onClick={handelnavToggle} to="#" className={"block to-gray-600 hover:text-black"}>Men</NavLink>
   <NavLink onClick={handelnavToggle} to="#" className={"block to-gray-600 hover:text-black"}>Women</NavLink>
   <NavLink onClick={handelnavToggle} to="#" className={"block to-gray-600 hover:text-black"}>Top Wear</NavLink>
   <NavLink onClick={handelnavToggle} to="#" className={"block to-gray-600 hover:text-black"}>Bottom Wear</NavLink>
    </nav>
        
      </div>
     </div>
    </div>
  )
}

export default Navbar