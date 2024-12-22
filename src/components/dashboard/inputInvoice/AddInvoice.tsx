"use client";

import { Button } from "@/components/ui/button"; // Giữ nguyên Button
import { Input } from "@/components/ui/input"; // Giữ nguyên Input
import { useForm } from "react-hook-form"; // Import react-hook-form

interface AddInvoiceProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (invoice: {
    id: number;
    invoiceDate: Date;
    totalAmount: number;
    linkPdf: string;
    employee_id: number;
  }) => void;
}

const AddInvoice: React.FC<AddInvoiceProps> = ({ isOpen, onClose, onAdd }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      invoiceDate: new Date(),
      totalAmount: 0,
      linkPdf: "",
      employee_id: 0,
    },
  });

  const onSubmit = (data: {
    invoiceDate: Date;
    totalAmount: number;
    linkPdf: string;
    employee_id: number;
  }) => {
    const newInvoice = {
      ...data,
      id: Date.now(), // Tạo ID duy nhất dựa trên timestamp
    };
    onAdd(newInvoice); // Gọi hàm onAdd để gửi dữ liệu lên cha
    reset(); // Reset form
    onClose(); // Đóng modal
  };

  if (!isOpen) return null; // Không hiển thị nếu không mở modal

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Thêm Hóa Đơn Nhập Kho</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Invoice Date */}
          <div>
            <Input
              type="date"
              {...register("invoiceDate", { required: "Ngày nhập kho là bắt buộc" })}
            />
            {errors.invoiceDate && <p className="text-red-500 text-sm">{errors.invoiceDate.message}</p>}
          </div>

          {/* Total Amount */}
          <div>
            <Input
              type="number"
              placeholder="Tổng tiền"
              {...register("totalAmount", { required: "Tổng tiền là bắt buộc" })}
            />
            {errors.totalAmount && <p className="text-red-500 text-sm">{errors.totalAmount.message}</p>}
          </div>

          {/* Link to PDF */}
          <div>
            <Input
              placeholder="Link PDF"
              {...register("linkPdf", { required: "Link PDF là bắt buộc" })}
            />
            {errors.linkPdf && <p className="text-red-500 text-sm">{errors.linkPdf.message}</p>}
          </div>

          {/* Employee ID */}
          <div>
            <Input
              type="number"
              placeholder="ID nhân viên"
              {...register("employee_id", { required: "ID nhân viên là bắt buộc" })}
            />
            {errors.employee_id && <p className="text-red-500 text-sm">{errors.employee_id.message}</p>}
          </div>

          <div className="flex justify-end mt-4">
            <Button type="submit" className="mr-2">Lưu</Button>
            <Button type="button" onClick={() => { reset(); onClose(); }}>Hủy</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInvoice;
