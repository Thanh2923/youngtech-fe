import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icon từ react-icons
import { ToastContainer, toast } from 'react-toastify';

const ResetPasswordForm = ({ onSubmit }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Hiển thị/Ẩn mật khẩu

  const handleSubmit = () => {
    if (password !== confirmPassword) {
        toast.error("Mật khẩu và xác nhận mật khẩu không khớp!");
    } else {
      onSubmit(password); // Callback khi mật khẩu hợp lệ
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Đặt mật khẩu mới
      </h2>
      <form className="flex flex-col gap-6 w-full">
        {/* Nhập mật khẩu mới */}
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Nhập mật khẩu mới"
            className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* Icon hiển thị/ẩn mật khẩu */}
          <div
            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </div>
        </div>

        {/* Xác nhận mật khẩu */}
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Xác nhận mật khẩu"
            className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {/* Icon hiển thị/ẩn mật khẩu */}
          <div
            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </div>
        </div>

        {/* Nút gửi */}
        <Button
          type="button" onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Đặt mật khẩu
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
