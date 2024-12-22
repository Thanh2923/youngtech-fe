"use client"
import { FaStar } from "react-icons/fa";

import Image from "next/image";
import { useState } from "react";
import FormComment from "./formComment";

const listStar = [
  {
    id:1,
    nameStar:"Rất tệ",
    iconStar: <FaStar/>,
  },
  {
    id:2,
    nameStar:"Tệ",
    iconStar: <FaStar/>,
  },
  {
    id:3,
    nameStar:"Tạm ổn",
    iconStar: <FaStar/>,
  },
  {
    id:4,
    nameStar:"Tốt",
    iconStar: <FaStar/>,
  },
  {
    id:5,
    nameStar:"Rất tốt",
    iconStar: <FaStar/>,
  }
]
const ReviewProduct = ({setIsOpen}) => {
  const [rating, setRating] = useState(0);
  const closeModal = () => {
    setIsOpen(false);
  };
 
  const handleRating = (index) => {
    if (rating === index) {
      
      setRating(0);
    } else {
      // Nếu click vào ngôi sao mới thì cập nhật rating
      setRating(index);
    }
  };

    return (
      <>
      
          <div className="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-80">
            <div className="bg-white rounded-lg p-6 w-[700px] shadow-lg relative">
             
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
  
              {/* Title */}
              <h2 className="text-center text-xl font-semibold mb-4">
                Đánh giá sản phẩm
              </h2>
  
              {/* Product info */}
              <div className="flex w-full flex-col items-center mb-6">
              <Image 
    src="/designImage/imageProducts/dienthoai/ip1.png" 
    alt="Logo" 
    className='transform transition-transform duration-500 ease-in-out group-hover:-translate-y-4'
    width={100}  
    height={150} 
  />
                <p className="text-lg py-5 font-medium">
                  Điện thoại iPhone 16 Pro Max 256GB
                </p>
              </div>
              <div  className="flex justify-center  cursor-pointer gap-3 mb-4">
               {listStar.map(star =>(
                <>
                 <div onClick={()=>handleRating(star.id)} className={`${rating >=star.id ? "flex justify-center text-[20px] items-center text-orange-600  flex-col" : "flex justify-center text-[20px] text-gray-500  items-center  flex-col"}`}>
                    {star.iconStar}
                    <span>{star.nameStar}</span>
                 </div>
                </>
               ))}

         
              </div>

              {rating ? <FormComment star={rating}  /> : ""}
  
              

            
            </div>
          </div>

      </>
    );
}

export default ReviewProduct
