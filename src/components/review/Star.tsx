import React from 'react'
import { FaStar } from "react-icons/fa6";

const Star = () => {
  return (
    <>
    <div className='w-full flex gap-2 items-center'>
    <p className='text-[13px]'>5</p>
    <FaStar className=' text-[14px]' />
    <div className='w-[250px] h-2 rounded-lg bg-slate-200'>
       <div className='w-[40%] h-2 rounded-lg bg-orange-400 '></div>
    </div>
     <p className='text-[13px]'>40%</p>
   </div>
    </>
  )
}

export default Star
