import React from "react";
import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import Link from "next/link";
const Action = () => {
  return (
    <>
      <Link
        href="#"
        className="hover:bg-white bg-black/50 rounded-md transition-all duration-300 ease-in-out w-[40px] h-[40px]   flex  justify-center items-center"
      >
        <FaRegEye className="text-[1.1rem] text-slate-500" />
      </Link>
      <Link
        href="#"
        className="hover:bg-orange-300 bg-black/50 rounded-md  transition-all duration-300 ease-in-out w-[40px] h-[40px]  flex  justify-center items-center"
      >
        <RiDeleteBin6Line className="text-[1.1rem] text-orange-600" />
      </Link>
      <Link
        href="/dashboard/quanly-kinhdoanh/thongtin-khachhang"
        className="hover:bg-red-300 rounded-md bg-black/50  transition-all duration-300 ease-in-out w-[40px] h-[40px]  flex  justify-center items-center"
      >
        <FiEdit3 className="text-[1.1rem] text-red-600" />
      </Link>
    </>
  );
};

export default Action;
