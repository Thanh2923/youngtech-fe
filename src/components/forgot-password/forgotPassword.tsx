"use client";
import React, { useState } from "react";
import EnterOTP from "./Enterotp";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPasswordForm from "./ResetPasswordForm";
import { AiOutlineClose } from "react-icons/ai"; // Icon đóng
import { resetPassword, sendEmail, verifyOTP } from "@/services/ForgotPassword/ForgotPassword";
import { useRouter } from "next/navigation";

const ForgotPassword = ({ isShowForm, onClose }) => {
  const router = useRouter();
  const [step, setStep] = useState("email"); // Trạng thái bước hiện tại
  const [email, setEmail] = useState("");

  // Hàm gửi email
  const handleEmailSubmit = async () => {
    try {
      const sendEmailForm = await sendEmail(email);
      if (sendEmailForm.success === true) {
        toast.success("Xác nhận email thành công!");
        setTimeout(() => {
          setStep("otp");
        }, 2000);
      } else {
        toast.error(sendEmailForm.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi gửi email!");
    }
  };

  // Hàm gửi OTP
  const handleOTPSubmit = async (otp) => {
    try {
      const sendOtp = await verifyOTP(email, otp);
      if (sendOtp.success === true) {
        toast.success("Xác nhận OTP thành công!");
        setTimeout(() => {
          setStep("reset");
        }, 2000);
      } else {
        toast.error(sendOtp.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xác nhận OTP!");
    }
  };

  // Hàm gửi mật khẩu mới
  const handleResetPassword = async (newPassword) => {
    try {
      const resetPass = await resetPassword(email, newPassword);
      if (resetPass.success === true) {
        toast.success("Cập nhật mật khẩu thành công!");
        // Chuyển hướng sang trang đăng nhập sau khi reset mật khẩu
        setTimeout(() => {
            onClose();
            setStep("email");
        }, 2000);
      } else {
        toast.error(resetPass.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi reset mật khẩu!");
    }
  };

  return (
    <>
      {isShowForm ?
        <div className="w-full flex justify-center items-center bg-slate-950 bg-opacity-50 h-full fixed top-0 left-0 z-50">
          <ToastContainer />
          <div className="relative bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6">
            {/* Nút X để đóng */}
            <div
              className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-800"
              onClick={onClose}
            >
              <AiOutlineClose size={24} />
            </div>

            {/* Bước 1: Nhập email */}
            {step === "email" && (
              <form className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                  Quên mật khẩu
                </h2>
                <p className="text-sm text-gray-600 text-center">
                  Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email của bạn"
                  required
                />
                <button
                  type="button"
                  onClick={handleEmailSubmit}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Gửi yêu cầu
                </button>
              </form>
            )}

            {/* Bước 2: Nhập OTP */}
            {step === "otp" && (
              <EnterOTP onSubmit={handleOTPSubmit} email={email} />
            )}

            {/* Bước 3: Đặt mật khẩu mới */}
            {step === "reset" && (
              <ResetPasswordForm onSubmit={handleResetPassword} />
            )}
          </div>
        </div>
        : ""
      }
    </>
  );
};

export default ForgotPassword;
