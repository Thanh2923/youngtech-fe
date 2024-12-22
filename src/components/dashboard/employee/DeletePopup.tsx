import React from "react";
import { deleteEmployee } from "@/services/employee/EmployeeService";
import { toast } from "react-toastify";

const DeletePopup = ({ visible, onHide, employee, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await deleteEmployee(employee.id);
      onDeleteSuccess(employee.id);
      onHide();
    } catch {
      toast.error("Xóa thất bại, vui lòng thử lại.");
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg text-black shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold mb-4">Xác nhận xoá</h2>
        <p className="mb-6">Bạn có chắc chắn muốn xóa nhân viên <strong>{employee?.fullName}</strong>?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onHide}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
