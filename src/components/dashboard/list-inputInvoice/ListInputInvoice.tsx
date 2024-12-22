"use client";

import React from "react";
import { Button } from "@/components/ui/button"; // Giữ nguyên Button
import { Table } from "@/components/ui/table"; // Giữ nguyên Table
import { FaFilePdf } from "react-icons/fa"; // Icon PDF

interface Invoice {
  id: number;
  invoiceNumber: string;
  date: string;
  pdfLink: string;
}

interface InvoiceListProps {
  invoices: Invoice[]; // Dữ liệu danh sách hóa đơn
}

const InvoiceList: React.FC<InvoiceListProps> = ({ invoices }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Danh Sách Hóa Đơn</h2>
      <Table>
        <thead className="text-left">
          <tr>
            <th className="py-5">Mã Hóa Đơn</th>
            <th className="py-5">Ngày</th>
            <th className="py-5">Tải PDF</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="h-12">
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.date}</td>
              <td>
                <Button
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => window.open(invoice.pdfLink, "_blank")}
                >
                  <FaFilePdf /> Tải PDF
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default InvoiceList;
