"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { updateSupplier } from "@/services/supplier/SupplierService";
import { Supplier } from '@/types/SupplierTypes';
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UpdateSupplierProps {
  supplier: Supplier;
  onCancel: () => void;
  onUpdateSuccess: (updatedSupplier: Supplier) => void;
}

const UpdateSupplier: React.FC<UpdateSupplierProps> = ({
  supplier,
  onCancel,
  onUpdateSuccess,
}) => {
  const [supplierName, setSupplierName] = useState(supplier.supplierName);
  const [contactName, setContactName] = useState(supplier.contactName);
  const [phoneNumber, setPhoneNumber] = useState(supplier.phoneNumber);
  const [email, setEmail] = useState(supplier.email);
  const [address, setAddress] = useState(supplier.address);
  const router = useRouter();

  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const updatedSupplier = {
        supplierName,
        contactName,
        phoneNumber,
        email,
        address,
      };
      
      await updateSupplier(supplier.id, updatedSupplier);
      toast.success("Nhà cung cấp đã được chỉnh sửa thành công!");
      onUpdateSuccess({ ...supplier, ...updatedSupplier });
      
      // Chuyển hướng đến trang quản lý nhà cung cấp sau 2 giây
      setTimeout(() => {
        router.push("/dashboard/quanly-nha-cungcap");
      }, 2000);
    } catch (error) {
      console.error("Lỗi khi chỉnh sửa nhà cung cấp:", error.message);
      toast.error("Lỗi khi chỉnh sửa nhà cung cấp!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#282F36] rounded-lg p-6">
      <form onSubmit={handleEditSubmit} className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={onCancel}
            className="text-blue-600 hover:text-blue-800"
          >
            <ShinyRotatingBorderButton>Quay lại</ShinyRotatingBorderButton>
          </button>
          <h2 className="text-2xl font-bold text-white text-center flex-1">
            Sửa nhà cung cấp
          </h2>
        </div>
        
        {/* Tên nhà cung cấp */}
        <div>
          <label
            htmlFor="supplierName"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            Tên nhà cung cấp
          </label>
          <input
            id="supplierName"
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập tên nhà cung cấp"
          />
        </div>

        {/* Tên liên lạc */}
        <div>
          <label
            htmlFor="contactName"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            Tên liên lạc
          </label>
          <input
            id="contactName"
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập tên liên lạc"
          />
        </div>

        {/* Số điện thoại */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            Số điện thoại
          </label>
          <input
            id="phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập số điện thoại"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập email"
          />
        </div>

        {/* Địa chỉ */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            Địa chỉ
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập địa chỉ"
          />
        </div>

        <div className="flex justify-center gap-4">
          <button type="submit" className="px-4 py-2 text-white rounded-md">
            <ShinyRotatingBorderButton>Lưu thay đổi</ShinyRotatingBorderButton>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSupplier;
