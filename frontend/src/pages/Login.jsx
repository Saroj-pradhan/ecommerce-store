import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import { loginUser } from '../Redux/slices/authSlice';
import { toast } from 'sonner';
import { useDispatch,useSelector} from 'react-redux';
import { mergeUsers } from '../Redux/slices/cartSlice';
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email,setemail] = useState("");
   const [password,setpassword] = useState("");
  const handelLogin = async (e)=>{
e.preventDefault();
const guestId = localStorage.getItem("guestId");
console.log("guest",guestId);
try{
const loginStatus =await  dispatch(loginUser({email,password}));
const mergeStatus = await dispatch(mergeUsers(guestId));
 navigate("/");
  console.log(loginStatus,mergeStatus,"kkkkk");
}catch(err){
toast.error(err.message);
    console.error("Login Failed ❌", err);
}



 
   }
   const {user,guestId} = useSelector((state)=>state.auth) 
  return (
    <div>
         <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row px-1.5 '>
          <div className='w-[100%] md:w-[50%] h-[450px]   p-3  flex justify-center items-center   '>
            <div className='border-2 w-[100%] md:w-[70%] lg:w-[70%] p-5 border-gray-200 shadow-2xl'>
              <h1 className='text-xl font-semibold mb-2'>Welcome to Snapkart</h1>
              <p className='mb-6'>Enter username & password to Login</p>
             <form action="" onSubmit={handelLogin} className='flex flex-col '>
           
             <label htmlFor="mail" className='mb-2'>Email Address</label>
            <input onChange={(e)=>setemail(e.target.value)} value={email} type="email" id="mail" placeholder='Enter Email Address' className='mb-4 w-full h-9 p-1 rounded focus:outline-gray-500 bg-gray-100'/>
             <label htmlFor="name" className='mb-2'>Enter password</label>
            <input onChange={(e)=>setpassword(e.target.value)} value={password} type="password" id="pass" placeholder='Enter Password' className='mb-4 w-full h-9 p-1 rounded focus:outline-gray-500 bg-gray-100'/>
             <button type='submit' className='bg-black text-white text-lg w-full py-1 rounded mb-4'
             
             >Login</button>
            </form>
           
            <p className='text-center'>dont have an Account <Link to="/signup" className='text-blue-500'>signup</Link> </p>
            </div>
            
          </div>
          <div className='w-[100%] md:w-[50%] h-[450px]  px-2 '>
            <img className='h-full w-full object-cover object-center' src="https://res.cloudinary.com/dddmddgzs/image/upload/v1756133366/1750257754_img_1_hg4bhz.webp" alt=""  />
          </div>
         </div>
    </div>
  )
}

export default Login
