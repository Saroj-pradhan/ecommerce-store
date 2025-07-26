import React from 'react'
import {TbBrandMeta} from 'react-icons/tb'
import {IoLogoInstagram} from "react-icons/io"
import {RiTwitterXLine} from 'react-icons/ri'
function TopBar() {
  return (
    <div className='bg-red-500 text-white flex justify-between p-1.5'>
        <div className='hidden sm:block flex gap-2'>
            <div className='flex gap-2'><a href=""></a><TbBrandMeta className='h-5 w-5'/>
            <a href=""></a><IoLogoInstagram className='h-5 w-5'/>
            <a href=""><RiTwitterXLine className='h-5 w-5'/></a></div>
        </div>
        <div className='text-sm text-center mx-auto'>
          we ship world wide  with help of secure Delivery.
        </div>
        <div className='text-sm  text-white hidden sm:block'>
          
          <a href="tel+917655090123">+91 7655090123</a>
        </div>
    </div>
  )
}

export default TopBar