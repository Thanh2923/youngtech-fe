import React from "react";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";
const Delete = ({url} : {url : string } ) => {
  return (
    <Link
      href={`"${url}"`}
      className="hover:bg-orange-300 bg-black/50 rounded-md  transition-all duration-300 ease-in-out w-[40px] h-[40px]  flex  justify-center items-center"
    >
      <RiDeleteBin6Line className="text-[1.1rem] text-orange-600" />
    </Link>
  );
};

export default Delete;
