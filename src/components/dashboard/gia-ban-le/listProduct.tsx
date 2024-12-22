'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Update from '../Action/update';

const ITEMS_PER_PAGE = 5; // Số lượng mục hiển thị mỗi trang

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (page: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/viewListProduct?page=${page}`
      );
      const { data, totalPages: total } = response.data;
      setProducts(data);
      setTotalPages(total);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <Table className="min-w-full divide-y">
        <thead className="text-left bg-[#282F36] text-white/80">
          <tr>
            <th className="py-3 px-4 text-center">STT</th>
            <th className="py-3 px-4 text-center">Tên sản phẩm</th>
            <th className="py-3 px-4 text-center">Thương hiệu</th>
            <th className="py-3 px-4 text-center">Hình ảnh</th>
            <th className="py-3 px-4 text-center">Giá bán lẻ</th>
            <th className="py-3 px-4 text-center">Giá khuyến mãi</th>
            <th className="py-3 px-4 text-center">Giá gốc</th>
            <th className="py-3 px-4 text-center">Ngày tạo</th>
            <th className="py-3 px-4 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 ">
          {currentItems.length > 0 ? (
            currentItems.map((product, index) => (
              <tr
                key={product.id}
                className="bg-[#282F36] text-white/80 border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]"
              >
                <td className="py-3 px-4 text-sm text-center text-gray-400">{startIndex + index + 1}</td>
                <td className="py-3 px-4 text-sm text-center text-gray-200">{product.productName}</td>
                <td className="py-3 px-4 text-sm text-center text-gray-200">{product.brand}</td>
                <td className="py-3 px-4 text-sm text-center">
                  <img 
                    src={product.images[0]?.imageUrl || 'https://via.placeholder.com/150'} 
                    alt="img" 
                    className="rounded-xl w-12 h-12" 
                  />
                </td>
                <td className="py-3 px-4 text-sm text-center text-gray-200">{product.productRetailPrice || 'N/A'}</td>
                <td className="py-3 px-4 text-sm text-center text-gray-200">{product.productSalePrice || 'N/A'}</td>
                <td className="py-3 px-4 text-sm text-center text-gray-200">{product.productPrice}</td>
                <td className="py-3 px-4 text-sm text-center text-gray-200">{new Date(product.createAt).toLocaleDateString()}</td>
                <td className="py-3 px-4 flex justify-center gap-4">
                  <Button
                    className="hover:bg-blue-500 rounded-md transition-all duration-300 ease-in-out w-[40px] h-[40px] flex justify-center items-center"                  >
                  <Update  url={`/dashboard/quanly-kinhdoanh/giaban-le/${product.id}`}  />

                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="py-4 text-center text-gray-400 text-sm">
                Không có sản phẩm nào để hiển thị.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="flex justify-center mt-4 gap-2">
        <Button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm rounded bg-gray-500 hover:bg-gray-700 text-white"
        >
          <HiChevronLeft className="text-xl" />
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            className={`px-3 py-2 text-sm rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-[#1E293B] hover:bg-gray-700 text-gray-300'}`}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm rounded bg-gray-500 hover:bg-gray-700 text-white"
        >
          <HiChevronRight className="text-xl" />
        </Button>
      </div>
    </>
  );
};

export default ListProducts;
