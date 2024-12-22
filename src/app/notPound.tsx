// app/not-found.js
import Image from 'next/image';
import React from 'react';

const NotFound = () => {
  return (
 <div className='w-full bg-white mb-5 py-10 items-center justify-center flex'>
    <div className='w-[80%] flex items-center m-auto'>
    <Image className='w-[50%]' src="/images/page-not-pound.png" alt='not-pound' width={500} height={500} />
    <h3 className='text-[48px] font-sans text-gray-800'>Xin lỗi, chúng tôi không tìm thấy trang mà bạn cần!</h3>
    </div>
 </div>
  );
};

export default NotFound;
