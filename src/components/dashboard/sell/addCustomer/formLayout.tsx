"use client";
import React from "react";
import { useState, useEffect } from "react";
import { ShinyRotatingBorderButton } from "../../ButtonSave/BtnSave";
import { ModernSimpleInput } from "../../editProduct/InputType";
import { ToastContainer, toast } from "react-toastify";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useContext } from "react";
const baseURL = process.env.NEXT_PUBLIC_API_URL;
import { UserContext } from "@/app/dashboard/quanly-banhang/ban-hang/page";
import "react-toastify/dist/ReactToastify.css";
const FormLayout = () => {
  const { customerId, setCustomerId } = useContext(UserContext);
  const { data: session, status } = useSession();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    address: ""
  });
  const validateForm = () => {
    let isValid = true;
    const newErrors = { fullName: "", phoneNumber: "", address: "" };

    if (!fullName.trim()) {
      newErrors.fullName = "Tên khách hàng không được để trống.";
      isValid = false;
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Số điện thoại không được để trống.";
      isValid = false;
    } else if (!/^\d{10,11}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Số điện thoại phải có 10-11 chữ số.";
      isValid = false;
    }

    if (!address.trim()) {
      newErrors.address = "Địa chỉ không được để trống.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  if (!session || !session.accessToken) {
    toast.error("Bạn chưa đăng nhập. Vui lòng đăng nhập trước.");
    return;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Ngăn gọi lại khi đang xử lý
    setIsSubmitting(true); // Khóa nút submit

    if (validateForm()) {
      const formData = { fullName, phoneNumber, address };
      try {
        const response = await axios.post(
          `${baseURL}/customers/addCustomerOffline`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`
            }
          }
        );
        if (response.data.data) {
          setCustomerId(response.data.data);
          alert("Tạo customer thành công");
        } else {
          toast.error("Lỗi khi tạo khách hàng, vui lòng kiểm tra lại.");
        }
      } catch (error) {
        console.error("Lỗi API:", error);
        const errorMessage =
          error.response?.data?.message || "Có lỗi xảy ra khi gửi yêu cầu.";
        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false); // Mở khóa nút submit
      }
    }
  };
  const handleReset = () => {
    setFullName("");
    setPhoneNumber("");
    setAddress("");
    setIsSubmitting(false);
    setErrors({ fullName: "", phoneNumber: "", address: "" });
  };
  return (
    <>
      <ToastContainer />
      <h2 className="text-white/70 text-[1.1rem] mb-3">
        Nhập thông tin khách hàng{" "}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="input-name flex flex-col gap-2">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            Tên khách hàng
          </label>
          <ModernSimpleInput
            id="fullName"
            className="w-72"
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nhập tên khách hàng..."
            type="text"
            value={fullName}
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm">{errors.fullName}</span>
          )}
        </div>
        <div className="input-name flex flex-col gap-2">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            Số điện thoại
          </label>
          <ModernSimpleInput
            id="phoneNumber"
            className="w-72"
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Nhập sdt khách hàng..."
            type="text"
            value={phoneNumber}
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-sm">{errors.phoneNumber}</span>
          )}
        </div>
        <div className="input-name flex flex-col gap-2">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            Địa chỉ khách hàng
          </label>
          <ModernSimpleInput
            id="address"
            className="w-72"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Nhập địa chỉ khách hàng..."
            type="text"
            value={address}
          />
          {errors.address && (
            <span className="text-red-500 text-sm">{errors.address}</span>
          )}
        </div>
        <div className="flex gap-3 items-center ">
          <ShinyRotatingBorderButton
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang xử lý..." : "Submit"}
          </ShinyRotatingBorderButton>
          <ShinyRotatingBorderButton
            type="button"
            onClick={handleReset}
            className="w-full"
          >
            Reset
          </ShinyRotatingBorderButton>
        </div>
      </form>
    </>
  );
};

export default FormLayout;
