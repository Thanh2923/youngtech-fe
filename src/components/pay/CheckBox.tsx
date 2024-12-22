"use client"
import { useState } from "react";

const CheckBox = ({ label, defaultChecked }) => {
    const [isChecked, setIsChecked] = useState(defaultChecked);
  
    const handleChecked = () => {
      setIsChecked(!isChecked);
    };
    return (
      <>
        <div className="flex items-center">
          <input
            className="w-6 h-6 cursor-pointer"
            type="checkbox"
            value="receive"
            checked={isChecked}
            onChange={handleChecked}
          />
          <p className="text-[14px]  font-semibold ml-4">{label}</p>
        </div>
  
        {isChecked === true ? (
          <div className="mt-[20px]">
            <div className="flex items-center">
              <div className="flex items-center mr-5">
                <input
                  name="done"
                  type="radio"
                  className="w-6 mr-6 h-6"
                  value="nam"
                  id="nam"
                />
                <span className="text-[14px]  font-semibold">Nam</span>
              </div>
              <div className="flex  items-center ">
                <input
                  id="nu"
                  type="radio"
                  name="done"
                  value="Nu"
                  className="w-6 mr-6 h-6"
                />
                <span className="text-[14px]  font-semibold">Nữ</span>
              </div>
            </div>
            <div className="info-name-phone2 mt-[20px] flex items-center justify-between">
              <div className="group/name grid w-[68%]">
                <label
                  id="name"
                  className="font-semibold text-gray-600 text-[16px] ml-3"
                >
                  Họ và tên nguoi nhan
                </label>
                <input
                  type="text"
                  className="border outline-none p-2 rounded-2xl cursor-pointer capitalize text-[14px] text-gray-500 border-gray-300 hover:border-pink-500"
                  placeholder="Nhap ho va ten cua ban"
                />
              </div>
              <div className="group/phone grid w-[28%]">
                <label
                  id="name"
                  className="font-semibold text-gray-600 text-[16px] ml-3"
                >
                  Số điện thoại nguoi nhan
                </label>
                <input
                  type="text"
                  className="border outline-none p-2 rounded-2xl cursor-pointer capitalize text-[14px] text-gray-500 border-gray-300 hover:border-pink-500"
                  placeholder="Nhap số điện thoại cua ban"
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  };

  export default CheckBox