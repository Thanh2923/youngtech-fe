"use client";

import React from "react";
import { Table } from "@/components/ui/table"; // Kiểm tra lại đường dẫn components
import { Button } from "@/components/ui/button"; // Kiểm tra lại đường dẫn components
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

interface Invoice {
  id: number;
  invoiceNumber: string;
  date: string;
  supplier: string;
  amount: number;
  status: string;
}

interface InvoiceTableProps {
  invoices: Invoice[];
  onEdit: (invoice: Invoice) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void; // Thêm phần hiển thị chi tiết hóa đơn
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <Table>
      <thead className="text-left">
        <tr>
          <th className="py-5">Mã Hóa Đơn</th>
          <th className="py-5">Ngày</th>
          <th className="py-5">Nhà Cung Cấp</th>
          <th className="py-5">Số Tiền</th>
          <th className="py-5">Trạng Thái</th>
          <th className="py-5">Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr key={invoice.id} className="h-12">
            <td>{invoice.invoiceNumber}</td>
            <td>{invoice.date}</td>
            <td>{invoice.supplier}</td>
            <td>{invoice.amount}</td>
            <td>{invoice.status}</td>
            <td className="gap-2 flex">
              <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={() => onView(invoice.id)}
              >
                <FaEye />
              </Button>
              <Button
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() => onEdit(invoice)}
              >
                <FaEdit />
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={() => onDelete(invoice.id)}
              >
                <MdDeleteOutline />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default InvoiceTable;
