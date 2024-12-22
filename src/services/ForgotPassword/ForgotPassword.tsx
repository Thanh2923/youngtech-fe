import axios from "axios";

// API URL
const Api_url = process.env.NEXT_PUBLIC_API_URL;
const API_URL_ForgotPassword = `${Api_url}/auth`;

// Gửi email để nhận liên kết đặt lại mật khẩu
export const sendEmail = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL_ForgotPassword}/generateOtp`, { email });

    // Kiểm tra status code trả về từ API
    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message, // Nhận thông báo thành công từ server
      };
    } else {
      // Xử lý các lỗi khác từ server nếu có
      return {
        success: false,
        message: response.data.message || 'Đã có lỗi xảy ra.',
      };
    }
  } catch (error: any) {
    // Nếu có lỗi trong quá trình gọi API, trả về thông báo lỗi
    return {
      success: false,
      message: error.response?.data?.message || 'Gửi email thất bại.',
    };
  }
};

// Gửi OTP để xác nhận
export const verifyOTP = async (email: string, otp: string) => {
  try {
    const response = await axios.post(`${API_URL_ForgotPassword}/sendingOTP`, { email, otp });

    // Kiểm tra status code trả về từ API
    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message, // Nhận thông báo thành công từ server
      };
    } else {
      // Xử lý các lỗi khác từ server nếu có
      return {
        success: false,
        message: response.data.message || 'Đã có lỗi xảy ra.',
      };
    }
  } catch (error: any) {
    // Nếu có lỗi trong quá trình gọi API, trả về thông báo lỗi
    return {
      success: false,
      message: error.response?.data?.message || 'Xác nhận OTP thất bại.',
    };
  }
};

// Đặt lại mật khẩu mới
export const resetPassword = async (email: string, newPassword: string) => {
  try {
    const response = await axios.patch(`${API_URL_ForgotPassword}/resetPassword`, { email, newPassword  });

    // Kiểm tra status code trả về từ API
    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message, // Nhận thông báo thành công từ server
      };
    } else {
      // Xử lý các lỗi khác từ server nếu có
      return {
        success: false,
        message: response.data.message || 'Đã có lỗi xảy ra.',
      };
    }
  } catch (error: any) {
    // Nếu có lỗi trong quá trình gọi API, trả về thông báo lỗi
    return {
      success: false,
      message: error.response?.data?.message || 'Đặt lại mật khẩu thất bại.',
    };
  }
};
