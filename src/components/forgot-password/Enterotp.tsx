import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EnterOTP = ({ onSubmit, email }) => {
  const [otp, setOtp] = useState(new Array(6).fill("")); // Tạo mảng 6 ký tự cho OTP
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      // Cập nhật giá trị ô nhập
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Di chuyển con trỏ đến ô tiếp theo
      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Di chuyển con trỏ về ô trước khi xoá
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const otpCode = otp.join(""); // Ghép mã OTP
    if (otpCode.length === 6) {
      onSubmit(otpCode); // Gửi mã OTP
    } else {
      toast.warning("Vui lòng nhập đầy mã otp !")
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Xác thực OTP
      </h2>
      <p className="text-sm text-gray-600 text-center">
        Nhập mã OTP đã được gửi đến email: <strong>{email}</strong>
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full">
        {/* Ô nhập OTP */}
        <div className="flex gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)} // Gán ref cho từng ô
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          ))}
        </div>
        {/* Nút xác nhận */}
        <Button type="button" onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Xác nhận
        </Button>
      </form>
    </div>
  );
};

export default EnterOTP;
