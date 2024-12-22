"use client"
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { SiVisa, SiMastercard, SiPaypal, SiDiscover } from 'react-icons/si';
import { usePathname } from "next/navigation";
const Footer = () => {
  const pathname = usePathname();
  const isAdmin = pathname.includes('/dashboard');
  return (
   <>
    {!isAdmin && (
      <footer className="bg-slate-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          {/* Đăng ký nhận tin */}
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
            <h3 className="text-lg font-bold uppercase mb-2">Hãy là người đầu tiên biết</h3>
            <p className="text-gray-400 mb-4">
              Nhận tất cả thông tin mới nhất về Sự kiện, Giảm giá và Ưu đãi. Đăng ký nhận bản tin ngay hôm nay.
            </p>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Địa chỉ Email"
                className="p-2 rounded-l-md w-full max-w-xs"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md">
                Đăng ký
              </button>
            </div>
          </div>

          {/* Liên kết */}
          <div className="flex flex-col lg:flex-row w-full lg:w-2/3 justify-between">
            <div className="mb-6 lg:mb-0">
              <h4 className="text-lg font-bold uppercase mb-3">Thông tin liên hệ</h4>
              <p className="text-gray-400">123 Đường ABC, Thành phố, Anh Quốc</p>
              <p className="text-gray-400">Điện thoại: (123) 456-7890</p>
              <p className="text-gray-400">Email: mail@example.com</p>
            </div>
            <div className="mb-6 lg:mb-0">
              <h4 className="text-lg font-bold uppercase mb-3">Tài khoản của tôi</h4>
              <ul className="text-gray-400">
                <li>Về chúng tôi</li>
                <li>Liên hệ</li>
                <li>Tài khoản của tôi</li>
                <li>Lịch sử đơn hàng</li>
                <li>Tìm kiếm nâng cao</li>
                <li>Đăng nhập</li>
              </ul>
            </div>
            <div className="mb-6 lg:mb-0">
              <h4 className="text-lg font-bold uppercase mb-3">Tổng đài hỗ trợ</h4>
              <ul className="text-gray-400">
                <li>Gọi mua: <b className='text-white'>1900 232 461</b> (8:00 - 21:30)</li>
                <li>Khiếu nại: <b className='text-white'>1800.1063 </b> (8:00 - 21:30)</li>
                <li>Bảo hành: <b className='text-white'>1900 232 465</b> (8:00 - 21:00)</li>
                
              </ul>
            </div>
          </div>
        </div>

        {/* Biểu tượng mạng xã hội và thanh toán */}
        <div className="flex flex-col lg:flex-row justify-between items-center mt-10">
          <div className="flex space-x-4 mb-6 lg:mb-0">
            <a href="#" className="text-white bg-gray-700 p-2 rounded-full hover:bg-blue-600">
              <FaLinkedinIn />
            </a>
            <a href="#" className="text-white bg-gray-700 p-2 rounded-full hover:bg-blue-600">
              <FaTwitter />
            </a>
            <a href="#" className="text-white bg-gray-700 p-2 rounded-full hover:bg-blue-600">
              <FaFacebookF />
            </a>
          </div>
          <div className="text-gray-400 text-center lg:text-left">
            © Porto eCommerce. 2019. Bảo lưu mọi quyền
          </div>
          <div className="flex space-x-4 mt-4 lg:mt-0">
            <SiPaypal className="text-2xl" />
            <SiMastercard className="text-2xl" />
            <SiDiscover className="text-2xl" />
            <SiVisa className="text-2xl" />
          </div>
        </div>

        {/* Thời gian làm việc */}
        <div className="text-center lg:text-right mt-6 text-gray-400">
          <p>Ngày/giờ làm việc: Thứ 2 - Chủ Nhật / 9:00AM - 8:00PM</p>
        </div>
      </div>
    </footer>
    )  
     }
   </>
    
  )
};

export default Footer;
