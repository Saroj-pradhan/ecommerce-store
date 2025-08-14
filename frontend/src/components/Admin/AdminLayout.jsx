import React, { useEffect, useState ,useRef} from 'react'
import { NavLink } from 'react-router-dom'
import { FaUsers } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { CiViewList } from "react-icons/ci";
import { IoLogOut } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { Outlet } from 'react-router-dom';
function AdminLayout() {
    const [issidebarOpen , setissidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const handelsidebar =()=>{
    setissidebarOpen((prev)=>!prev);
    }

 

    useEffect(()=>{
      const handelmobiesidebar = (event)=>{
         //   console.log(event);
       if(sidebarRef.current && issidebarOpen && !sidebarRef.current.contains(event.target)){
         setissidebarOpen(false);
       }
      }
      window.addEventListener("mousedown",handelmobiesidebar);
      return ()=> window.removeEventListener("mousedown", handelmobiesidebar );
    },[issidebarOpen])

  return (
    <div className='relative h-full '>
       {/* mobile views */}
        <div ref={sidebarRef} className={`flex flex-col sm:flex-row w-1/2 absolute top-0 left-0 sm:hidden ${issidebarOpen?"block":"hidden"}`}>
             <div className=' sm:w-1/2 border-2 p-3 text-white bg-gray-800 h-screen'>
                <div className='flex justify-between items-center mb-4 '>
                <h3 className='font-bold text-lg'>Admin Dashboard</h3>
                <button onClick={handelsidebar}><ImCross className='h-3 w-3'/></button>
                </div>
                
                <div className='flex flex-col'>
               <NavLink to="/admin/usermanagement" className={"hover:bg-white hover:text-black px-1 py-1 mb-2 flex items-center"}><FaUsers className='mx-1 h-5 w-5'/> Users</NavLink>
               <NavLink to="/admin/productManage" className={"hover:bg-white hover:text-black px-1 py-1 mb-2 flex items-center"}><FaBoxOpen className='mx-1 h-5 w-5'/>Products</NavLink>
               <NavLink to="/admin/ordermanagement" className={"hover:bg-white hover:text-black px-1 py-1 mb-2 flex items-center"}><CiShop className='mx-1 h-5 w-5'/>orders</NavLink>
               <NavLink to="/" className={"hover:bg-white hover:text-black px-1 py-1 mb-2 flex items-center"}><CiViewList className='mx-1 h-5 w-5'/>Shop</NavLink>
                </div>
                <button className={"bg-red-500 text-white  w-full py-1 mb-2 flex justify-center items-center mt-2"}> <IoLogOut className='mx-1 h-5 w-5'/>Logout</button>
             </div>
            
        </div>




        <div className='  flex  '>
             <div className='sm:block hidden w-full sm:w-[22%] border-2 p-3 text-white bg-gray-800 h-screen'>
                 <h3 className='mb-4 font-bold text-xl'>Admin Dashboard</h3>
                <div className='flex flex-col'>
               <NavLink to="/admin/usermanagement" className={"hover:bg-white hover:text-black px-1 py-1 mb-2 flex items-center"}><FaUsers className='mx-1 h-5 w-5'/> Users</NavLink>
               <NavLink to="/admin/productManage" className={"hover:bg-white hover:text-black px-1 py-1 mb-2 flex items-center"}><FaBoxOpen className='mx-1 h-5 w-5'/>Products</NavLink>
               <NavLink to="/admin/ordermanagement" className={"hover:bg-white hover:text-black px-1 py-1 mb-2 flex items-center"}><CiShop className='mx-1 h-5 w-5'/>orders</NavLink>
               <NavLink to="/" className={"hover:bg-white hover:text-black px-1 py-1 mb-2 flex items-center"}><CiViewList className='mx-1 h-5 w-5'/>Shop</NavLink>
                </div>
                <button className={"bg-red-500 text-white  w-full py-1 mb-2 flex justify-center items-center mt-2"}> <IoLogOut className='mx-1 h-5 w-5'/>Logout</button>
             </div>
             <div  className='w-full sm:w-[78%]  px-2 pb-2'>
                 <div className='bg-black flex p-2 sm:hidden'>
                        <button  className={"bg-black text-white"} onClick={()=>handelsidebar()}> <HiBars3BottomLeft className='h-6 w-6 text-white'/></button>
                  <h3 className=' text-white w-full ml-3'>Admin Panel</h3>
                 </div>
                <Outlet/>
             </div>
            </div>
    </div>
  )
}

export default AdminLayout