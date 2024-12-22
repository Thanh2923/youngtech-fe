"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button"; // Giữ nguyên Button
import { Input } from "@/components/ui/input"; // Giữ nguyên Input
import { useForm } from "react-hook-form"; // Import react-hook-form

interface EditInvoiceProps {
  isOpen: boolean; // Xác định xem modal có mở hay không
  onClose: () => void; // Hàm đóng modal
  invoice: { // Dữ liệu hóa đơn hiện tại
    id: number;
    invoiceDate: Date;
    totalAmount: number;
    linkPdf: string;
    employee_id: number;
  } | null;
  onEdit: (invoice: {
    id: number;
    invoiceDate: Date;
    totalAmount: number;
    linkPdf: string;
    employee_id: number;
  }) => void; // Hàm xử lý sửa hóa đơn
}

const EditInvoice: React.FC<EditInvoiceProps> = ({
  isOpen,
  onClose,
  invoice,
  onEdit,
}) => {
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      invoiceDate: new Date(),
      totalAmount: 0,
      linkPdf: "",
      employee_id: 0,
    },
  });

  // Cập nhật giá trị form khi invoice thay đổi
  useEffect(() => {
    if (invoice) {
      setValue("invoiceDate", invoice.invoiceDate);
      setValue("totalAmount", invoice.totalAmount);
      setValue("linkPdf", invoice.linkPdf);
      setValue("employee_id", invoice.employee_id);
    }
  }, [invoice, setValue]);

  // Xử lý submit form
  const onSubmit = (data: {
    invoiceDate: Date;
    totalAmount: number;
    linkPdf: string;
    employee_id: number;
  }) => {
    const updatedInvoice = {
      ...invoice,
      ...data, // Gộp dữ liệu mới và cũ
    };
    onEdit(updatedInvoice); // Gửi dữ liệu cập nhật về component cha
    reset(); // Reset form
    onClose(); // Đóng modal
  };

  if (!isOpen) return null; // Không hiển thị modal nếu isOpen = false

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Chỉnh Sửa Hóa Đơn Nhập Kho</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Mã Hóa Đơn */}
          <Input
            value={invoice?.id || ""}
            readOnly
            placeholder="Mã hóa đơn"
          />

          {/* Ngày Nhập Kho */}
          <Input
            type="date"
            placeholder="Ngày nhập kho"
            {...register("invoiceDate", { required: "Ngày nhập kho là bắt buộc" })}
          />

          {/* Tổng Tiền */}
          <Input
            type="number"
            placeholder="Tổng tiền"
            {...register("totalAmount", { required: "Tổng tiền là bắt buộc" })}
          />

          {/* Link PDF */}
          <Input
            placeholder="Link PDF"
            {...register("linkPdf", { required: "Link PDF là bắt buộc" })}
          />

          {/* ID Nhân Viên */}
          <Input
            type="number"
            placeholder="ID nhân viên"
            {...register("employee_id", { required: "ID nhân viên là bắt buộc" })}
          />

          {/* Nút hành động */}
          <div className="flex justify-end mt-4">
            <Button type="submit" className="mr-2">
              Cập Nhật
            </Button>
            <Button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Hủy
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInvoice;
