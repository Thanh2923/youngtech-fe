'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";

interface InputInvoice {
  id: string;
  invoiceDate: string;
  totalAmount: number;
  linkPdf: string;  // Trường linkPdf trong dữ liệu
}

const InputInvoiceList: React.FC = () => {
  const [invoices, setInvoices] = useState<InputInvoice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch invoices from API
  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/inputinvoice/getList`);
        console.log(response.data); // Kiểm tra dữ liệu trong console
        
        if (Array.isArray(response.data.data)) { // Truy cập vào response.data.data
          setInvoices(response.data.data); // Lấy dữ liệu từ trường data
        } else {
          setError("Dữ liệu không hợp lệ.");
        }
      } catch (err) {
        setError("Không thể tải danh sách hóa đơn.");
        console.error("Error fetching invoices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-white">Danh sách hóa đơn</h1>
      {loading && <p className="text-white">Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Ngày hóa đơn</th>
            <th className="border border-gray-300 px-4 py-2">Tổng tiền</th>
            <th className="border border-gray-300 px-4 py-2">Link PDF</th> {/* Thêm cột Link PDF */}
          </tr>
        </thead>
        <tbody className="text-white">
          {/* Kiểm tra invoices có phải là mảng trước khi gọi map */}
          {Array.isArray(invoices) && invoices.length > 0 ? (
            invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="border border-gray-300 px-4 py-2 text-center">{invoice.id}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{invoice.invoiceDate}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {invoice.totalAmount.toLocaleString()} đ
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {/* Sửa lại để dùng linkPdf từ API */}
                  <a
                    href={invoice.linkPdf} // Sử dụng linkPdf thay vì linkPDF
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Xem PDF
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">Không có hóa đơn nào để hiển thị.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InputInvoiceList;
