"use client"; // Import getSession từ next-auth
import { signIn,useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock } from "react-icons/ai";
import { Video } from "../../components/video/Video";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import ForgotPassword from "@/components/forgot-password/forgotPassword";

// Define validation schema with Yup
const schema = yup.object({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  password: yup.string().required("Mật khẩu không được để trống"),
}).required();

interface IFormInput {
  email: string;
  password: string;
}

const Page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema), // Attach yup validation schema here
  });
  const [checked, setChecked] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isShowForm,setShowForm] = useState(false)

    // Hàm đóng modal
    const handleClose = () => {
      setShowForm(false)
    };
    const handlOpen = () => {
      setShowForm(true)
    };

    useEffect(()=>{
     if(session){
      if(session?.user.role === "customer"){
        router.push("/")
    }else{
      router.push("/dashboard")
    }
     }
    },[session])
  // Define the onSubmit function
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const {email,password} = data
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })
    if (res.status === 401) {
      toast.error("Email hoặc mật khẩu không đúng");
    } else if (res.status === 200) {
      toast.success("Đăng nhập thành công!");
    } else {
      toast.error("Lỗi server");
    }
   

  
  };

  const handleGoogleLogin = async () => {
     await signIn("google", { redirect: false });
    await axios.post(`${apiUrl}/auth/register`, {
      userName: "than",  // Lấy tên từ thông tin người dùng Google
      email: "thhhnnvnn@gmail.com",    // Lấy email từ thông tin người dùng Google
      password: '',         // Để trống mật khẩu vì Google đã cung cấp thông tin xác thực
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
         
    
  };
  return (
   <>
   <ToastContainer />
    <div className="min-h-screen motion-preset-slide-right motion-duration-3000 flex my-5 justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full lg:w-[90%] mx-5 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <Video className="hidden p-8 lg:block lg:w-[50%]" />
          <div className="w-full lg:w-[45%] p-8">
            <h2 className="text-2xl motion-duration-2000  motion-preset-slide-right font-bold text-center mb-8 text-gray-700">
              Đăng nhập
            </h2>

            <div className="text-center mb-6">
              <Link href="#">
                <button onClick={handleGoogleLogin} className="flex items-center justify-center w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition duration-300">
                  <FcGoogle className="mr-2" size={22} />
                  <span className="text-sm font-medium">Đăng nhập với Google</span>
                </button>
              </Link>
            </div>

            <h5 className="text-center text-gray-500 mb-6">hoặc</h5>

            <form className="   " onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <span className="flex items-center px-3">
                    <AiOutlineMail className="text-gray-500" size={22} />
                  </span>
                  <input
                    type="email"
                    placeholder="Nhập email của bạn..."
                    className="w-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <div className="flex items-center gap-4 border rounded-lg overflow-hidden">
                  <AiOutlineLock className="ml-3 text-gray-500" size={22} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu của bạn..."
                    className="w-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-3 flex items-center justify-center"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="text-gray-500" size={22} />
                    ) : (
                      <AiOutlineEye className="text-gray-500" size={22} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="w-full flex items-center mb-4">
                <div className="flex w-[70%] items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
                <label className="text-sm">
                  Tôi đồng ý với{" "}
                  <span className="text-blue-600 cursor-pointer">
                    điều khoản sử dụng
                  </span>
                </label>
                </div>
                <div className="w-[30%] flex justify-end items-center">
                <button type="button" onClick={handlOpen} className="text-blue-600 text-[14px] font-semibold">
                  Quên mật khẩu
                </button>
                </div>
               
              </div>


              {/* Submit Button */}
              <button
                type="submit"
                disabled={!checked}

                className={`w-full py-3 text-white rounded-lg transition duration-300 ${checked ? "bg-blue-600 hover:bg-blue-700 cursor-pointer" : "bg-gray-300 cursor-not-allowed"}`}
              >
                Đăng nhập
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Chưa có tài khoản?{" "}
                <Link href="/register" className="text-blue-600 font-semibold">
                  Đăng kí ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
      <ForgotPassword isShowForm={isShowForm} onClose={handleClose}/> 
   </>
  );
};

export default Page;
