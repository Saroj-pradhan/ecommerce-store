import React from 'react'
import MyOrders from './MyOrders'
import {useSelector , useDispatch} from "react-redux"
import {logout} from "../Redux/slices/authSlice"
import { toast } from 'sonner'
function Profile() {
 const {user} = useSelector((state)=>state.auth);
 console.log(user,"user")
  const dispatch = useDispatch();
  function handeLogout(){
dispatch(logout());
toast.success("logged out succesfully");
  }
  return (
    <div className='min-h-screen'>
        <div className='w-full h-full  flex flex-col  md:flex-row lg:flex-row'>
          <div className='md:w-[25%] p-3 md:h-screen border-2 bg-gray-50 border-gray-200 '>
            <h1 className=' text-2xl font-semibold mb-4 '>{user.name}</h1>
            <p className='text-gray-800 mb-4'></p>
            <button onClick={handeLogout} className='py-2 px-3 bg-red-500 text-white rounded w-full'>logout</button>
          </div>
         
            <MyOrders/>
          
        </div>
    </div>
  )
}

export default Profile