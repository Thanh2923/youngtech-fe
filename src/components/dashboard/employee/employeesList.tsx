"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getEmployees } from "@/services/employee/EmployeeService";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import DeletePopup from "./DeletePopup";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const ListEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const rows = 5; // Số dòng mỗi trang
  const totalPages = Math.ceil(filteredEmployees.length / rows);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const router = useRouter();

  // Lấy danh sách nhân viên từ server
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { message } = await getEmployees();
        setEmployees(message);
        setFilteredEmployees(message);
      } catch {
        toast.error("Không thể tải danh sách nhân viên.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Tìm kiếm nhân viên
  useEffect(() => {
    const filtered = employees.filter((emp) =>
      Object.values(emp).some((field) =>
        String(field).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredEmployees(filtered);
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
  }, [searchTerm, employees]);

  const handleEdit = (id) =>
    router.push(`/dashboard/quanly-nhanvien/chinhsua-nhanvien/${id}`);
  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setShowDeletePopup(true);
  };

  // Điều khiển phân trang
  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageClick = (page) => setCurrentPage(page);

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * rows,
    currentPage * rows
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 text-white">
      <DeletePopup
        visible={showDeletePopup}
        onHide={() => setShowDeletePopup(false)}
        employee={selectedEmployee}
        onDeleteSuccess={(id) => {
          const updatedEmployees = employees.filter((emp) => emp.id !== id);
          setEmployees(updatedEmployees);
          setFilteredEmployees(updatedEmployees);
          toast.success("Xóa thành công!");
        }}
      />

      {/* Tiêu đề */}
      <h1 className="text-xl font-bold mb-4">Danh sách nhân viên</h1>

      {/* Thanh tìm kiếm */}
      <div className="mb-4">
        <InputText
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm nhân viên..."
          className="mt-1 block px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Bảng danh sách */}
      <table className="table-auto w-full text-sm text-gray-200">
        <thead className="bg-[#282F36] text-white/80">
          <tr>
            <th className="py-3 px-4">STT</th>
            <th className="py-3 px-4">Tên nhân viên</th>
            <th className="py-3 px-4">Ảnh</th>
            <th className="py-3 px-4">Số điện thoại</th>
            <th className="py-3 px-4">Vị trí</th>
            <th className="py-3 px-4">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.length > 0 ? (
            paginatedEmployees.map((employee, index) => (
              <tr
                key={employee.id}
                className="border-t border-gray-700 hover:bg-[#22282E]"
              >
                <td className="py-2 px-4 text-center">
                  {(currentPage - 1) * rows + index + 1}
                </td>
                <td className="py-2 px-4">{employee.fullName}</td>
                <td className="py-2 px-4">
                  <Image
                    src={employee.profilePicture || "/default-avatar.png"}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </td>
                <td className="py-2 px-4">{employee.phoneNumber}</td>
                <td className="py-2 px-4">{employee.position}</td>
                <td className="py-2 px-4 flex justify-center space-x-2">
                  <Button
                    onClick={() => handleEdit(employee.id)}
                    className="bg-blue-500 rounded-md px-2"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(employee)}
                    className="bg-red-500 rounded-md px-2"
                  >
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4">
                Không có nhân viên nào
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-800 rounded disabled:opacity-50"
        >
          <HiChevronLeft />
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-slate-600 text-white"
                : "bg-gray-800 text-white"
            }`}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-800 rounded disabled:opacity-50"
        >
          <HiChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default ListEmployees;
