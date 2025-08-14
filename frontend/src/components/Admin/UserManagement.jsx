import {useState} from "react"
function UserManagement() {
   const [userform,setuserform] = useState({
   name:"",
   email:"",
   role:"",
   password:""
  });
  const [userdata,setuserdata] = useState([{
   name:"saroj",
   email:"sarojpradhan7655@gmail.com",
   role:"admin",
   password:"sanata@123"
  },
  {
   name:"manoj",
   email:"earnwithme7655@gmail.com",
   role:"admin",
   password:"rocker@123"
  },
]);
  const handelAddUsers = (event)=>{
    event.preventDefault();
    console.log(event);
    console.log(userform);
    console.log(userdata);
    setuserdata((prev)=>[...prev,userform]);
  }

  const handelDeleteuser = (mail)=>{
  
   setuserdata((prev)=>(
    prev.filter((person)=>(
  person.email !== mail
    ))
   ))
  }
  
  return (
    <div>
    <div>
                 <h3 className='text-2xl font-semibold mb-3 '>User Management</h3>
                 <div className='sm:p-2'>
                  <h4 className='text-xl font-semibold mb-3'>Add New User</h4>
                   <form className='flex flex-col mb-2' onSubmit={handelAddUsers}> 
                     <label htmlFor="name">Name</label>
                      <input value={userform.name} required onChange={(e)=>setuserform((prev)=> ({...prev,name:e.target.value}))} className="mb-2 p-0.5 outline-gray-500" type="text" placeholder='enter name'/>
                       <label htmlFor="name">Email</label>
                      <input value={userform.email} required onChange={(e)=>setuserform((prev)=>({...prev,email:e.target.value}))} className="mb-2 p-0.5 outline-gray-500" type="email" placeholder='enter email'/>
                       <label htmlFor="name">Password</label>
                      <input value={userform.password} required onChange={(e)=>setuserform((prev)=>({...prev,password:e.target.value}))} className="mb-2 p-0.5 outline-gray-500" type="password" placeholder='enter password'/>
                      <label htmlFor="Role mb-2">Role</label>
                      <select name="role" id="role" required value={userform.role}  onChange={(e)=>setuserform((prev)=>({...prev,role:e.target.value}))} className="mb-2 outline-gray-500">
                        <option value="">select</option>
                        <option className='sm:w-80% sm:h-20' value="admin">Admin</option>
                        <option className='sm:w-80% sm:h-20 mb-5 pb-4' value="user">User</option>
                      </select>
                      <button  type="submit" className='bg-green-500 text-white px-2 py-1 mt-5 max-w-[150px] '>Add user</button>
                   </form>
                 </div>
             <div className='w-full max-h-[600px]'>
               <table className='w-full'>
                  <thead className='bg-gray-400'>
                     <th className='uppercase p-2'>name</th>
                     <th className='uppercase p-2  sm:block hidden'>email</th>
                     <th className='uppercase p-2'>role</th>
                     <th className='uppercase p-2'>actions</th>
                  </thead>
                  <tbody>
                    {userdata.map((user)=>(
                       <tr>
                     <td className='text-center'>{user.name}</td>
                     <td className='text-center  sm:block hidden'>{user.email}</td>
                     <td className='text-center'>{user.role}</td>
                     <td className='text-center'><button  onClick={()=>handelDeleteuser(user.email)} className='bg-red-600 m-1 text-white px-2 py-1'>Delete</button></td>
                     </tr>
                    ))}
                    
                  </tbody>
               </table>
             </div>
             </div>
    </div>
  )
}

export default UserManagement