import React from "react";
import Link from "next/link";
import {FaRegEye} from "react-icons/fa";
const View = ({url} : {url : string}) => {
  return (
    <>
      <Link
        href={url}
        className="hover:bg-white bg-black/50 rounded-md transition-all duration-300 ease-in-out w-[40px] h-[40px]   flex  justify-center items-center"
      >
        <FaRegEye className="text-[1.1rem] text-slate-500" />
      </Link>
    </>
  );
};

export default View;
