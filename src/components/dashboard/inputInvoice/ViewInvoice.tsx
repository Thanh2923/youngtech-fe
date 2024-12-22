"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button"; // Giữ nguyên Button
import { Input } from "@/components/ui/input"; // Giữ nguyên Input
import { useForm } from "react-hook-form"; // Import react-hook-form

interface Invoice {
  id: number;
  invoiceNumber: string;
  date: string;
  supplier: string;
  amount: number;
  status: string;
}

interface ViewInvoiceProps {
  isOpen: boolean; // Xác định xem modal có mở hay không
  onClose: () => void; // Hàm đóng modal
  invoice: Invoice | null; // Dữ liệu hóa đơn hiện tại
}

const ViewInvoice: React.FC<ViewInvoiceProps> = ({
  isOpen,
  onClose,
  invoice,
}) => {
  const { setValue, reset } = useForm<Invoice>({
    defaultValues: {
      invoiceNumber: "", // Mã hóa đơn
      date: "", // Ngày hóa đơn
      supplier: "", // Nhà cung cấp
      amount: 0, // Số tiền
      status: "", // Trạng thái hóa đơn
    },
  });

  // Cập nhật giá trị form khi invoice thay đổi
  useEffect(() => {
    if (invoice) {
      setValue("invoiceNumber", invoice.invoiceNumber);
      setValue("date", invoice.date);
      setValue("supplier", invoice.supplier);
      setValue("amount", invoice.amount);
      setValue("status", invoice.status);
    }
  }, [invoice, setValue]);

  if (!isOpen) return null; // Không hiển thị modal nếu isOpen = false

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Chi Tiết Hóa Đơn</h2>
        <form className="space-y-4">
          {/* Invoice Number */}
          <div>
            <label className="text-sm">Mã hóa đơn</label>
            <Input
              value={invoice?.invoiceNumber || ""}
              readOnly
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-sm">Ngày</label>
            <Input
              value={invoice?.date || ""}
              readOnly
            />
          </div>

          {/* Supplier */}
          <div>
            <label className="text-sm">Nhà cung cấp</label>
            <Input
              value={invoice?.supplier || ""}
              readOnly
            />
          </div>

          {/* Amount */}
          <div>
            <label className="text-sm">Số tiền</label>
            <Input
              value={invoice?.amount || 0}
              readOnly
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm">Trạng thái</label>
            <Input
              value={invoice?.status || ""}
              readOnly
            />
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end mt-4">
            <Button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Đóng
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewInvoice;
