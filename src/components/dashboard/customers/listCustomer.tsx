'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import View from "../Action/view";
import Update from "../Action/update";
import ReactPaginate from "react-paginate";
import { RiDeleteBin6Line } from "react-icons/ri";

type Customer = {
  id: number;
  fullName: string;
  email: string | null;
  phoneNumber: string;
  address: string;
};

const ListCustomer = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentCustomers, setCurrentCustomers] = useState<Customer[]>([]);
  const [modalCustomerId, setModalCustomerId] = useState<number | null>(null); // Customer ID for deletion
  const customersPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/viewListCustomer`);
        const data = await response.json();
        if (data.data) {
          setCustomers(data.data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleViewHistory = (id: number) => {
    router.push(`/dashboard/quanly-kinhdoanh/thongtin-khachhang/${id}`);
  };

  const handleDelete = async () => {
    if (modalCustomerId === null) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customers/softDelete/${modalCustomerId}`,
        { method: "PATCH" }
      );
      if (response.ok) {
        setCustomers(customers.filter((customer) => customer.id !== modalCustomerId));
        alert("Xoá thành công!");
      } else {
        alert("Xoá thất bại, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error during delete:", error);
      alert("Đã xảy ra lỗi!");
    } finally {
      setModalCustomerId(null); // Đóng modal
    }
  };

  useEffect(() => {
    const indexOfLastCustomer = (currentPage + 1) * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    setCurrentCustomers(customers.slice(indexOfFirstCustomer, indexOfLastCustomer));
  }, [currentPage, customers]);

  if (loading) {
    return <div className="text-white">Đang tải dữ liệu khách hàng...</div>;
  }

  return (
    <div className="list-customer">
      {/* Table Layout */}
      <table className="min-w-full bg-[#282F36] text-white/50">
        <thead>
          <tr className="bg-[#282F36] border-b border-gray-500">
            <th className="px-4 py-2">Họ và tên</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Số điện thoại</th>
            <th className="px-4 py-2">Địa chỉ</th>
            <th className="px-4 py-2">Lịch sử</th>
            <th className="px-4 py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map((customer) => (
            <tr key={customer.id} className="hover:bg-[#22282E] border-b border-gray-500">
              <td className="px-4 py-2">{customer.fullName}</td>
              <td className="px-4 py-2">{customer.email || "N/A"}</td>
              <td className="px-4 py-2">{customer.phoneNumber}</td>
              <td className="px-4 py-2">{customer.address}</td>
              <td
                className="px-4 py-2 text-blue-500 cursor-pointer"
                onClick={() => handleViewHistory(customer.id)}
              >
                Xem lịch sử
              </td>
              <td className="px-4 py-2 flex items-center justify-center gap-2">
                <Update url={`/dashboard/quanly-kinhdoanh/thongtin-khachhang/suathongtin-khachhang/${customer.id}`} />
                <button
                  className="hover:bg-orange-300 bg-black/50 rounded-md transition-all duration-300 ease-in-out w-[40px] h-[40px] flex justify-center items-center"
                  onClick={() => setModalCustomerId(customer.id)}
                >
                  <RiDeleteBin6Line className="text-[1.1rem] text-orange-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls flex justify-center gap-2 mt-4">
  <button
    onClick={() => handlePageChange({ selected: currentPage - 1 })}
    disabled={currentPage === 0}
    className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
  >
    &lt;
  </button>

  {/* Render các số trang */}
  {Array.from({ length: Math.ceil(customers.length / customersPerPage) }, (_, index) => (
    <button
      key={index + 1}
      onClick={() => handlePageChange({ selected: index })}
      className={`${
        currentPage === index
          ? "bg-blue-500 text-white"
          : "bg-gray-700 text-white"
      } px-4 py-2 rounded`}
    >
      {index + 1}
    </button>
  ))}

  <button
    onClick={() => handlePageChange({ selected: currentPage + 1 })}
    disabled={currentPage === Math.ceil(customers.length / customersPerPage) - 1}
    className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
  >
    &gt;
  </button>
</div>


      {/* Delete Confirmation Modal */}
      {modalCustomerId !== null && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="mb-4 text-xl font-bold">Xác nhận xoá</h2>
            <p>Bạn có chắc chắn muốn xoá khách hàng này?</p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setModalCustomerId(null)}
              >
                Huỷ
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleDelete} // Confirm delete
              >
                Xoá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListCustomer;
