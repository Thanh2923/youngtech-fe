"use client";

import React, { useState, useRef } from "react";
import { FaSignOutAlt, FaTimes } from "react-icons/fa";
import { signOut } from "next-auth/react";

const Logout: React.FC = () => {
  const [isCounting, setIsCounting] = useState(false);
  const [count, setCount] = useState(5);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    if (isCounting) return;

    setIsCounting(true);
    timeoutRef.current = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 1) {
          clearInterval(timeoutRef.current!);
          signOut({ callbackUrl: "/" });
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  const handleCancel = () => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }
    setIsCounting(false);
    setCount(3);
  };

  return (
    <div className="relative cursor-pointer">
      <FaSignOutAlt
        size={40}
        className="text-white p-2 bg-gray-800 rounded-full shadow-lg hover:bg-gray-600 cursor-pointer transition-all duration-200"
        onClick={handleClick}
      />
      {isCounting && (
        <div className="absolute right-0 mt-2 w-32 bg-gray-800 border border-gray-700 rounded-lg shadow-lg text-white text-xl text-center py-2">
          <p>Đăng xuất sau: {count} s</p>
          <FaTimes
            size={20}
            className="absolute top-1 right-1 text-red-500 cursor-pointer"
            onClick={handleCancel}
          />
        </div>
      )}
    </div>
  );
};

export default Logout;
