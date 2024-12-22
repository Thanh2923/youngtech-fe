import React from 'react'
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useSelector } from "react-redux";

const TextComment = () => {
  const data = useSelector(state => state.Comment.Comment);
 console.log(data)
  return (
    <div>
        {data.map((comment, index) => (
          <div key={index} className='w-full '>
            <h3 className='w-full'>{comment.name}</h3>
            <div className='w-full gap-2 items-center flex'>
            {Array.from({ length: 5 }).map((_, starIndex) => {
              if (starIndex < comment.star) {
                // Nếu sao là 3 hoặc ít hơn, hiển thị màu vàng
                return <FaStar key={starIndex} className='text-orange-400 text-[14px]' />;
              } else {
                // Hiển thị sao không màu (hoặc màu đen)
                return <FaStar key={starIndex} className='text-gray-400 text-[14px]' />;
              }
            })}
              
              | 
              <FaHeart className='text-red-600 text-[14px]' />
              <p className='text-[14px]'>Sẽ giới thiệu cho bạn bè, người thân</p>
            </div>
            <div className='text-comment border-b-[1px] py-3'>
              <p className='text-[16px]'>{comment.comment}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TextComment;
