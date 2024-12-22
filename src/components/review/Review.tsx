"use client"
import NameProduct from '../InfoDetailProduct/NameProduct'
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import Star from './Star';
import TextComment from './TextComment';
import ReviewProduct from './ReviewProduct';
import { useState } from 'react';
 

  
const Review = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false); 
    const handlShowComment = ()=>{
        setIsOpen(true)
    }
  return (
  <>
 
  <div className='w-full bg-white p-5'>
   
   <NameProduct fontsize={fontsize} />
   <div className='w-full items-center gap-2 flex'>
     <strong className='text-orange-400 text-[18px]'>3.2</strong>
     <FaStar className='text-orange-400 text-[14px]' />
     <FaStar className='text-orange-400 text-[14px]' />
     <FaStar className='text-orange-400 text-[14px]' />
     <FaStar className='text-orange-400 text-[14px]' />
     <FaStarHalfAlt className='text-orange-400 text-[14px]' />
   </div>
   <Star/>
   <Star/>
   <Star/>
   <Star/>
   <Star/>
   <div className='comment py-5 w-full'>
      <TextComment/>
     
   </div>
   {isOpen && <ReviewProduct setIsOpen={setIsOpen} />}
   <div className='w-full pt-5 items-center justify-center flex gap-2'>
         <button className='w-[48%] py-2 hover:text-white hover:bg-slate-800 border border-slate-800 rounded-lg ' type="button">Xem 25 đánh giá </button>
         <button onClick={handlShowComment} className='w-[48%] py-2 hover:text-black hover:bg-white hover: border-red-500 border text-white bg-red-500 rounded-lg ' type="button">
          Viết đánh giá
           </button>
      </div>

  </div>
  </>
  )
}


const fontsize = {
    fontSize:'15px'
}

export default Review
