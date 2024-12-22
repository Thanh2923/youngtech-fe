"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";
import { toast } from "react-toastify";
import { Category_Child } from "@/types/CategoryTypes";
import { updateChildCategory } from "@/services/category/CategoryChildService";
const Api_url = process.env.NEXT_PUBLIC_API_URL;

interface UpdateChildCategoryProps {
  category: Category_Child;
  onCancel: () => void;
  onUpdateSuccess: (updatedCategory: Category_Child) => void;
}

const UpdateChildCategory: React.FC<UpdateChildCategoryProps> = ({
  category,
  onCancel,
  onUpdateSuccess,
}) => {
  const [parentCategories, setParentCategories] = useState<Category_Child[]>([]);
  const [parentCategoryName, setParentCategoryName] = useState<string>("");
  const [childCategoryName, setChildCategoryName] = useState<string>(category.childCateName);
  const [errors, setErrors] = useState({ parentCategoryName: "", childCategoryName: "" });

  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        const response = await axios.get(`${Api_url}/parencategories`);
        if (response.data && Array.isArray(response.data.data)) {
          setParentCategories(response.data.data);

          // Gán danh mục cha hiện tại
          const currentParentCategory = response.data.data.find(
            (cat) => cat.id === category.parentCategory_id
          );
          if (currentParentCategory) {
            setParentCategoryName(currentParentCategory.name);
          }
        } else {
          console.error("Invalid data received from API");
        }
      } catch (error) {
        console.error("Error fetching parent categories:", error.message);
      }
    };

    fetchParentCategories();
  }, [category.parentCategory_id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Kiểm tra lỗi
    const validationErrors: { parentCategoryName?: string; childCategoryName?: string } = {};
    if (!parentCategoryName) {
      validationErrors.parentCategoryName = "Vui lòng chọn danh mục cha.";
    }
    if (!childCategoryName.trim()) {
      validationErrors.childCategoryName = "Vui lòng nhập tên danh mục con.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Xóa lỗi nếu hợp lệ

    const selectedParent = parentCategories.find(
      (parent) => parent.name === parentCategoryName
    );

    if (!selectedParent) {
      toast.error("Danh mục cha không hợp lệ!");
      return;
    }

    const updatedCategory = {
      ...category,
      childCateName: childCategoryName.trim(),
      parentCategory_id: selectedParent.id,
    };

    try {
      await updateChildCategory(updatedCategory.id, updatedCategory);
      toast.success("Danh mục con đã được cập nhật thành công!");
      onUpdateSuccess(updatedCategory); // Gửi kết quả về component cha
    } catch (error) {
      console.error("Error updating child category:", error.message);
      toast.error("Lỗi khi cập nhật danh mục con!");
    }
  };

  const handleParentCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParentCategoryName(e.target.value);
    if (e.target.value) {
      setErrors((prev) => ({ ...prev, parentCategoryName: "" }));
    }
  };

  const handleChildCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChildCategoryName(e.target.value);
    if (e.target.value.trim()) {
      setErrors((prev) => ({ ...prev, childCategoryName: "" }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#282F36] rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <ShinyRotatingBorderButton type="button" onClick={onCancel}>
            Quay lại
          </ShinyRotatingBorderButton>
          <h2 className="text-2xl font-bold text-white text-center flex-1">
            Sửa danh mục con
          </h2>
        </div>

        {/* Danh mục cha */}
        <div>
          <label
            htmlFor="parentCategoryName"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            Chọn danh mục cha
          </label>
          <select
            id="parentCategoryName"
            value={parentCategoryName}
            onChange={handleParentCategoryChange}
            className={`mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border ${
              errors.parentCategoryName ? "border-red-500" : "border-gray-600"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">--Chọn danh mục cha--</option>
            {parentCategories.map((parent) => (
              <option key={parent.id} value={parent.name}>
                {parent.name}
              </option>
            ))}
          </select>
          {errors.parentCategoryName && (
            <p className="text-red-500 text-xs mt-1">{errors.parentCategoryName}</p>
          )}
        </div>

        {/* Tên danh mục con */}
        <div>
          <label
            htmlFor="childCategoryName"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            Tên danh mục con
          </label>
          <input
            id="childCategoryName"
            type="text"
            value={childCategoryName}
            onChange={handleChildCategoryChange}
            className={`mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border ${
              errors.childCategoryName ? "border-red-500" : "border-gray-600"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Nhập tên danh mục con"
          />
          {errors.childCategoryName && (
            <p className="text-red-500 text-xs mt-1">{errors.childCategoryName}</p>
          )}
        </div>

        {/* Nút lưu */}
        <div className="flex justify-center gap-4">
          <ShinyRotatingBorderButton type="submit">
            Lưu thay đổi
          </ShinyRotatingBorderButton>
        </div>
      </form>
    </div>
  );
};

export default UpdateChildCategory;
