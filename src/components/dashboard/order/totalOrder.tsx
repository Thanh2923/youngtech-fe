import React from 'react';
import { ShinyRotatingBorderButton } from '../ButtonSave/BtnSave';
const TotalOrder = () => {
    return (
        <div className="bg-[#282F36] rounded-xl p-3 w-[30%] ml-auto mt-5">
         <div className="total-price mb-5">
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-3">
            <div className="">
               <span className="text-[15px] font-bold text-white">Tộng cộng</span>
            </div>
            <div className="ship">
              <span className="text-[15px] font-bold text-white">Ship</span>
            </div>
            <div className="total">
              <span className="text-[15px] font-bold text-white">Tổng phải thu</span>
            </div>
            </div>
            <div className="flex !text-end flex-col gap-3">
            <div className="">
               <span className="text-red-500 font-bold ">1000</span>
            </div>
            <div className="ship">
              <span className="text-red-500 font-bold ">23</span>
            </div>
            <div className="total">
              <span className="text-red-500 font-bold ">300.000</span>
            </div>
            </div>
          </div>
          </div>
           <ShinyRotatingBorderButton>Lưu xử lý</ShinyRotatingBorderButton>
        </div>
    );
}

export default TotalOrder;
