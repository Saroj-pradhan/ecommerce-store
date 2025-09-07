import React, { useState ,useEffect} from 'react'
import { Link , useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../Redux/slices/authSlice';
import { toast } from 'sonner';
function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const [name,setname] = useState("");
    const [email,setemail] = useState("");
       const [password,setpassword] = useState("");
      const {loaing , error} = useSelector((state)=>state.auth);
       const handelLogin = (e)=>{
    e.preventDefault();
   dispatch(registerUser({name,email,password}));
   toast.success("signup and login also success");
   navigate("/");
       }
       if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  return (
    <div>
         <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row ml-1 mr-1 '>
          <div className='w-[100%] md:w-[50%] h-[450px]   p-3  flex justify-center items-center   '>
            <div className='border-2 w-[100%] md:w-[70%] lg:w-[70%] p-5 border-gray-200 shadow-2xl'>
              <h1 className='text-xl font-semibold mb-1'>Welcome to Snapkart</h1>
              <p className='mb-3'>Enter username & password to Login</p>
             <form action="" className='flex flex-col ' onSubmit={handelLogin}>
              <label htmlFor="name">Enter Name</label>
            <input onChange={(e)=>setname(e.target.value)} value={name} type="text" id="name" placeholder='Enter Name' className='mb-3 w-full h-9 p-1 rounded focus:outline-gray-500 bg-gray-100' />
             <label htmlFor="mail" className='mb-2'>Email Address</label>
            <input onChange={(e)=>setemail(e.target.value)} value={email} type="email" id="email" placeholder='Enter Email Address' className='mb-3 w-full h-9 p-1 rounded focus:outline-gray-500 bg-gray-100'/>
             <label htmlFor="name" className='mb-2'>Enter password</label>
            <input onChange={(e)=>setpassword(e.target.value)} value={password} type="password" id="pass" placeholder='Enter Password' className='mb-3 w-full h-9 p-1 rounded focus:outline-gray-500 bg-gray-100'/>
             <button type='submit' className='bg-black text-white text-lg w-full py-1 rounded mb-3'
             
             >register</button>
            </form>
           
            <p className='text-center'>dont have an Account <Link to="/login" className='text-blue-500'>login</Link> </p>
            </div>
            
          </div>
          <div className='w-[100%] md:w-[50%] h-[450px] px-3 '>
            <img className='h-full w-full object-cover object-center' src="https://res.cloudinary.com/dddmddgzs/image/upload/v1756133366/1750257754_img_1_hg4bhz.webp" alt="img"  />
          </div>
         </div>
    </div>
  )
}

export default Signup