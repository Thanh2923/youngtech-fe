"use client";
import { FaAnglesLeft,FaAnglesRight } from "react-icons/fa6";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Lấy trang hiện tại từ URL query, nếu không có thì mặc định là 1
  const currentPage = parseInt(searchParams.get("page") || "1");

  // Hàm xử lý khi click vào nút phân trang
  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      // Cập nhật URL query
      const params = new URLSearchParams(searchParams as any);
      params.set("page", page.toString());
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div className="flex justify-center text-[16px] gap-3 items-center mt-4 space-x-2">
      {/* Nút quay về trang trước */}
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}

      >
        <FaAnglesLeft  />
      </button>

      {/* Các nút số trang */}
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => handleClick(page)}
            className={`   ${
              currentPage === page
                ? "bg-slate-950 px-3 py-1 rounded-full text-white"
                : " text-black"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Nút chuyển tới trang tiếp theo */}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}

      >
       <FaAnglesRight/>
      </button>
    </div>
  );
};

export default Pagination;
