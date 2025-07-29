import { NavLink } from 'react-router-dom'
import {TbBrandMeta} from 'react-icons/tb'
import {IoLogoInstagram} from "react-icons/io"
import {RiTwitterXLine} from 'react-icons/ri'
import { FiPhoneCall } from "react-icons/fi";
function Footer() {
  return (
    <footer className=' py-12 botder-t'>
    <div className=' container mx-auto grid grid-cols-1 md:grid-cols-4 px-4 gap-8 md:px-0'>
        <div className='p-1'>
            <h3 className='text-lg text-gray-800 mb-4 font-semibold'>News Letter</h3>
            <p className='text-gray-500 mb-2.5'>Be the first to here abot new product , the Exclusive Events and online offer </p>
            <p className='text-gray-700 mb-2.5'>Signup and get 10% offer on 1st order</p>
            <form className='flex'>
                <input type="email"
                 placeholder='Enter your Email'
                 className='border-t border-l border-b p-3 w-full border-gray-500 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all'
                 required
                 />
                <button type='submit' className='w-full bg-black text-white px-6 py-3 rounded-r-md hover:bg-gray-800 transition-all'>Subscribe</button>
            </form>
        </div>
        <div>
            <h3 className='text-lg text-gray-800 mb-4 font-semibold'>Shop</h3>
            <div className='flex flex-col'>
            <NavLink to={"#"} className={" mb-3.5  hover:text-gray-600 transition-colors"}> Men's Top Wear</NavLink>
            <NavLink to={"#"} className={" mb-3.5  hover:text-gray-600 transition-colors"}> Women's Bottom Wear</NavLink>
            <NavLink to={"#"} className={" mb-3.5  hover:text-gray-600 transition-colors"}> Men's Top Wear</NavLink>
            <NavLink to={"#"} className={" mb-3.5  hover:text-gray-600 transition-colors"}> Women's Bottom Wear</NavLink>
            </div>
           
        </div>
        <div>
            <h3 className='text-lg text-gray-800 mb-4 font-semibold'>Support</h3>
             <div className='flex flex-col '>
            <NavLink to={"#"} className={" mb-3.5  hover:text-gray-600 transition-colors"}>Contact us</NavLink>
            <NavLink to={"#"} className={" mb-3.5  hover:text-gray-600 transition-colors"}>About us</NavLink>
            <NavLink to={"#"} className={" mb-3.5  hover:text-gray-600 transition-colors"}>FAQ'S</NavLink>
            <NavLink to={"#"} className={" mb-3.5  hover:text-gray-600 transition-colors"}>Features</NavLink>
            </div>
        </div>
        <div>
            <h3 className='text-lg text-gray-800 mb-4 font-semibold'>Follow us</h3>
            <div className='flex items-center gap-3.5 mb-4'>
                <a className='h-5 w-5 hover:text-gray-500' target='_blank' href="https://www.facebook.com"><TbBrandMeta/></a>
                <a className='h-5 w-5 hover:text-gray-500' target='_blank' href="https://www.instagram.com"><IoLogoInstagram/></a>
                <a className='h-5 w-5 hover:text-gray-500' target='_blank' href="https://www.x.com"><RiTwitterXLine/></a>
                
            </div>
            <div>
                <p className='text-lg font-medium mb-4'>Call us</p>
                <p><FiPhoneCall className='h-5 w-5 inline-block mr-1.5' />+91 7655012345</p>
            </div>
        </div>
    </div> 
    <div className='border-gray-200 mt-12 border-t container mx-auto text-center tracking-tighter'>
        <p>©2025  SnapCart All Right's Reserved</p>
    </div>
    </footer>
  )
}

export default Footer