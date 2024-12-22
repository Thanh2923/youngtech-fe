'use client';

import React from "react";

interface PopupViewPDFProps {
  invoiceId: string;
  employeeCode: string;
  data: {
    id: number;
    productName: string;
    date: string;
    supplier: string;
    price: number;
    quantity: number;
    total: number;
  }[];
  onClose: () => void;
}

const PopupViewPDF: React.FC<PopupViewPDFProps> = ({ invoiceId, employeeCode, data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-4xl rounded shadow-lg p-6 relative">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &#x2715;
        </button>

        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold text-center mb-4">HÓA ĐƠN - {invoiceId}</h2>
        <p className="text-center text-gray-600 mb-4">Nhân viên nhập: {employeeCode}</p>

        {/* Bảng chi tiết sản phẩm */}
        <table className="table-auto w-full border border-gray-300 text-gray-800">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">STT</th>
              <th className="border border-gray-300 px-4 py-2">Tên sản phẩm</th>
              <th className="border border-gray-300 px-4 py-2">Ngày</th>
              <th className="border border-gray-300 px-4 py-2">Nhà cung cấp</th>
              <th className="border border-gray-300 px-4 py-2">Giá</th>
              <th className="border border-gray-300 px-4 py-2">Số lượng</th>
              <th className="border border-gray-300 px-4 py-2">Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{item.productName}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.date}</td>
                <td className="border border-gray-300 px-4 py-2">{item.supplier}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {item.price.toLocaleString()} đ
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.quantity}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {item.total.toLocaleString()} đ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PopupViewPDF;
