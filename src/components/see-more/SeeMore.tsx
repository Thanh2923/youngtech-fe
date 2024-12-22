import React from 'react';
import { IoIosArrowForward } from "react-icons/io";
const SeeMore = () => {
  return (
    <div className='w-full flex justify-center items-center py-5'>
      <div className='w-[50%] lg:w-[30%] rounded-lg shadow-md border-blue-500  group hover:translate-x-2 cursor-pointer border  py-3 flex gap-2 justify-center items-center transition-transform transform '>
        <h3 className='font-semibold text-[15px]  text-blue-600'>Xem thêm sản phẩm</h3>

        <IoIosArrowForward className='text-[#0144b7] transition-colors'  />
      </div>
    </div>
  );
}

export default SeeMore;
