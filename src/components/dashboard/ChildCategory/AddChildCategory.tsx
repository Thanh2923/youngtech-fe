"use client";
import { addChildCategory } from "@/services/category/CategoryChildService";
import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Api_url = process.env.NEXT_PUBLIC_API_URL;

const AddChildCategory = () => {
  const [parentCategories, setParentCategories] = useState([]);
  const [parentCategoryName, setParentCategoryName] = useState("");
  const [childCategoryName, setChildCategoryName] = useState("");
  const [errors, setErrors] = useState({ parentCategoryName: "", childCategoryName: "" });
  const router = useRouter();

  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        const response = await axios.get(`${Api_url}/parencategories`);
        setParentCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching parent categories:", error.message);
      }
    };

    fetchParentCategories();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors: { parentCategoryName?: string; childCategoryName?: string } = {};

    if (!parentCategoryName) {
      validationErrors.parentCategoryName = "Vui lòng chọn danh mục cha.";
    }

    if (!childCategoryName) {
      validationErrors.childCategoryName = "Vui lòng nhập tên danh mục con.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Clear errors if valid

    try {
      const selectedCategory = parentCategories.find((cat) => cat.name === parentCategoryName);
      if (selectedCategory) {
        await addChildCategory({
          childCateName: childCategoryName,
          parentCategory_id: selectedCategory.id,
          flag: false,
        });

        toast.success("Danh mục con đã được thêm thành công!");
        setChildCategoryName("");
        setParentCategoryName("");

        setTimeout(() => {
          router.push("/dashboard/quanly-danhmuc-sanpham/danhsach-danhmuc-con");
        }, 2000);
      } else {
        toast.error("Không tìm thấy danh mục cha đã chọn.");
      }
    } catch (error) {
      console.error("Error adding child category:", error.message);
      toast.error("Lỗi khi thêm danh mục con!");
    }
  };

  const handleParentCategoryChange = (e) => {
    setParentCategoryName(e.target.value);
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, parentCategoryName: "" }));
    }
  };

  const handleChildCategoryChange = (e) => {
    setChildCategoryName(e.target.value);
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, childCategoryName: "" }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#282F36] rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <ShinyRotatingBorderButton
            onClick={() => router.push("/dashboard/quanly-danhmuc-sanpham/danhsach-danhmuc-con")}
          >
            Quay lại
          </ShinyRotatingBorderButton>
          <h2 className="text-2xl font-bold text-white text-center flex-1">
            Thêm danh mục con
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
            {parentCategories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
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

        {/* Button thêm */}
        <div className="flex justify-center gap-4">
          <ShinyRotatingBorderButton type="submit">
            Thêm danh mục con
          </ShinyRotatingBorderButton>
        </div>
      </form>
    </div>
  );
};

export default AddChildCategory;
