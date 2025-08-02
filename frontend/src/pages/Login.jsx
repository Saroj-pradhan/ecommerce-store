import React, { useState } from 'react'
import { Link } from 'react-router-dom';
function Login() {
  const [mail,setmail] = useState("");
   const [password,setpassword] = useState("");
   const handelLogin = (e)=>{
e.preventDefault();
console.log("jii")
console.log(mail);
console.log(password);
   }
  return (
    <div>
         <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row px-1.5 '>
          <div className='w-[100%] md:w-[50%] h-[450px]   p-3  flex justify-center items-center   '>
            <div className='border-2 w-[100%] md:w-[70%] lg:w-[70%] p-5 border-gray-200 shadow-2xl'>
              <h1 className='text-xl font-semibold mb-2'>Welcome to Snapkart</h1>
              <p className='mb-6'>Enter username & password to Login</p>
             <form action="" className='flex flex-col '>
           
             <label htmlFor="mail" className='mb-2'>Email Address</label>
            <input onChange={(e)=>setmail(e.target.value)} value={mail} type="email" id="mail" placeholder='Enter Email Address' className='mb-4 w-full h-9 p-1 rounded focus:outline-gray-500 bg-gray-100'/>
             <label htmlFor="name" className='mb-2'>Enter password</label>
            <input onChange={(e)=>setpassword(e.target.value)} value={password} type="password" id="pass" placeholder='Enter Password' className='mb-4 w-full h-9 p-1 rounded focus:outline-gray-500 bg-gray-100'/>
             <button type='submit' className='bg-black text-white text-lg w-full py-1 rounded mb-4'
             onClick={handelLogin}
             >Login</button>
            </form>
           
            <p className='text-center'>dont have an Account <Link to="/signup" className='text-blue-500'>signup</Link> </p>
            </div>
            
          </div>
          <div className='w-[100%] md:w-[50%] h-[450px]  px-2 '>
            <img className='h-full w-full object-cover' src="https://picsum.photos/500/500?random=8" alt="" srcset="" />
          </div>
         </div>
    </div>
  )
}

export default Login
