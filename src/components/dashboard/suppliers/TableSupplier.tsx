"use client";
import { Table } from '@/components/ui/table'; // Kiểm tra đường dẫn chính xác
import { Button } from '@/components/ui/button'; // Kiểm tra đường dẫn chính xác
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Supplier } from '@/types/SupplierTypes'; // Sử dụng kiểu dữ liệu cho nhà cung cấp
import { useState } from 'react'; // Import useState
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'; // Import icon

interface SupplierTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => void;
}

const SupplierTable: React.FC<SupplierTableProps> = ({ suppliers, onEdit, onDelete }) => {
  // State để quản lý trang hiện tại và số mục trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số nhà cung cấp trên mỗi trang (có thể tùy chỉnh)

  // Tính toán số trang và dữ liệu nhà cung cấp trên mỗi trang
  const totalPages = Math.ceil(suppliers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSuppliers = suppliers.slice(startIndex, startIndex + itemsPerPage);

  // Xử lý khi nhấn nút "Trang trước"
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Xử lý khi nhấn nút "Trang sau"
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Xử lý khi nhấn số trang cụ thể
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Table>
        <thead className="text-left bg-[#282F36] text-white/80 w-[calc(100%-95%)]">
          <tr>
            <th className="py-3 px-4">STT</th>
            <th className="py-3 px-4">Mã nhà cung cấp</th>
            <th className="py-3 px-4">Tên nhà cung cấp</th>
            <th className="py-3 px-4">Tên liên lạc</th>
            <th className="py-3 px-4">Số điện thoại</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Địa chỉ</th>
            <th className="py-3 px-4">Thao tác</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 ">
          {currentSuppliers.map((supplier, index) => (
            <tr key={supplier.id} className="product-item text-white/80 border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]">
              <td className="py-2 px-4 text-center">{startIndex + index + 1}</td>
              <td className="py-2 px-4">MNCC{supplier.id}</td>
              <td className="py-2 px-4">{supplier.supplierName}</td>
              <td className="py-2 px-4">{supplier.contactName}</td>
              <td className="py-2 px-4">{supplier.phoneNumber}</td>
              <td className="py-2 px-4">{supplier.email}</td>
              <td className="py-2 px-4">{supplier.address}</td>
              <td className="py-2 px-4 flex justify-center space-x-2">
                <Button 
                  className="hover:bg-blue-300 rounded-md bg-black/50 transition-all duration-300 ease-in-out w-[40px] h-[40px] flex justify-center items-center" 
                  onClick={() => onEdit(supplier)}
                >
                  <FaEdit className="text-[1.1rem] text-blue-600"/>
                </Button>
                <Button 
                  className="hover:bg-red-300 bg-black/50 rounded-md transition-all duration-300 ease-in-out w-[40px] h-[40px] flex justify-center items-center" 
                  onClick={() => onDelete(supplier.id)}
                >
                  <MdDeleteOutline className="text-[1.1rem] text-red-600"/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Nút phân trang */}
      <div className="flex justify-center items-center mt-4 space-x-2">
  <Button 
    onClick={handlePreviousPage} 
    disabled={currentPage === 1} 
    className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50 flex items-center justify-center"
  >
    <HiChevronLeft className="text-xl" /> {/* Dấu << */}
  </Button>

  {Array.from({ length: totalPages }, (_, index) => (
    <Button 
      key={index} 
      onClick={() => handlePageClick(index + 1)} 
      className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-slate-600 text-white' : 'bg-gray-800 text-white'}`}
    >
      {index + 1}
    </Button>
  ))}

  <Button 
    onClick={handleNextPage} 
    disabled={currentPage === totalPages} 
    className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50 flex items-center justify-center"
  >
    <HiChevronRight className="text-xl" /> {/* Dấu >> */}
  </Button>
</div>
    </>
  );
};

export default SupplierTable;
