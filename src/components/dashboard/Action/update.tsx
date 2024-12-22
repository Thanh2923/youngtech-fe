import React from "react";
import Link from "next/link";
import { FiEdit3 } from "react-icons/fi";

const Update = ({url} : {url : string }) => {
  return (
    <>
      <Link
          href={url}
        className="hover:bg-red-300 rounded-md bg-black/50  transition-all duration-300 ease-in-out w-[40px] h-[40px]  flex  justify-center items-center"
      >
        <FiEdit3 className="text-[1.1rem] text-red-600" />
      </Link>
    </>
  );
};

export default Update;
