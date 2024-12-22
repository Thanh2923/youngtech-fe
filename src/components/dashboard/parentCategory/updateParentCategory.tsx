"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { updateCategory } from "@/services/category/CategoryParentService";
import { Category_Paren } from '@/types/CategoryTypes';
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UpdateParentCategoryProps {
  category: Category_Paren;
  onCancel: () => void;
  onUpdateSuccess: (updatedCategory: Category_Paren) => void;
}

const UpdateParentCategory: React.FC<UpdateParentCategoryProps> = ({
  category,
  onCancel,
  onUpdateSuccess,
}) => {
  const [categoryName, setCategoryName] = useState(category.name);
  const [error, setError] = useState(""); // Trạng thái lỗi
  const router = useRouter();

  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!categoryName) {
      setError("Vui lòng nhập tên danh mục!"); // Hiển thị thông báo lỗi dưới ô input
      return;
    }
    try {
      await updateCategory(category.id, { name: categoryName });
      toast.success("Cập nhật danh mục thành công"); // Thông báo thành công
      onUpdateSuccess({ ...category, name: categoryName });
      setTimeout(() => {
        router.push("/dashboard/quanly-danhmuc-sanpham/danhsach-danhmuc-cha");
      }, 300000); // Redirect sau 3 giây
    } catch (error) {
      toast.error("Cập nhật danh mục thất bại"); // Hiển thị thông báo lỗi
      console.error("Error updating category:", error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#282F36] rounded-lg p-6">
      <form onSubmit={handleEditSubmit} className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <ShinyRotatingBorderButton type="button" onClick={onCancel}>
            Quay lại
          </ShinyRotatingBorderButton>
          <h2 className="text-2xl font-bold text-white text-center flex-1">
            Sửa danh mục cha
          </h2>
        </div>
        <div>
          <label
            htmlFor="categoryName"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            Tên danh mục
          </label>
          <input
            id="categoryName"
            type="text"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
              if (e.target.value) {
                setError(""); // Xóa lỗi khi có giá trị nhập vào
              }
            }}
            className={`mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border ${error ? 'border-red-500' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Nhập tên danh mục"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
        <div className="flex justify-center gap-4">
          <ShinyRotatingBorderButton type="submit">Lưu thay đổi</ShinyRotatingBorderButton>
        </div>
      </form>
    </div>
  );
};

export default UpdateParentCategory;
