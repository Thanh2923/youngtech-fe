"use client";

import React from "react";
import { Button } from "@/components/ui/button"; // Đảm bảo đường dẫn đúng
import { FaFilePdf } from "react-icons/fa"; // Icon PDF

// Dữ liệu mẫu
const invoices = [
  {
    id: 1,
    invoiceNumber: "INV-001",
    date: "2024-11-19",
    pdfLink: "/invoices/invoice-1.pdf", // Đảm bảo file PDF có trong thư mục public
  },
  {
    id: 2,
    invoiceNumber: "INV-002",
    date: "2024-11-20",
    pdfLink: "/invoices/invoice-2.pdf", // Đảm bảo file PDF có trong thư mục public
  },
];

const InvoicePage = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-lg font-bold mb-4">Danh Sách Hóa Đơn</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="py-5 px-4 text-left">Mã Hóa Đơn</th>
            <th className="py-5 px-4 text-left">Ngày</th>
            <th className="py-5 px-4 text-left">Tải PDF</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-t">
              <td className="py-3 px-4">{invoice.invoiceNumber}</td>
              <td className="py-3 px-4">{invoice.date}</td>
              <td className="py-3 px-4">
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => window.open(invoice.pdfLink, "_blank")}
                >
                  <FaFilePdf /> Tải PDF
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicePage;
