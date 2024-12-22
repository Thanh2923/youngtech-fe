'use client'
import { FaBorderAll } from "react-icons/fa";
import { MdSwitchAccount } from "react-icons/md";
import { useRouter,usePathname } from 'next/navigation'
import Image from "next/image";
import { signOut } from "next-auth/react";
const NavbarCustomer = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" }); // Chuyển hướng về trang login sau khi đăng xuất
  };
   
    const router = useRouter()
    const pathname = usePathname();
    
  return (
    
    <div className="w-1/4  bg-gray-100 h-screen p-6">
      <h2 className="text-xl font-bold mb-4">Bạn</h2>
      <ul className="">
        <li>
          <button type="button" onClick={() => router.push('/lich-su-mua-hang')} className={ `${pathname ==="/purchase-history" ? "w-full bg-slate-200 flex items-center rounded-md py-3 px-2 gap-2 text-left font-semibold" : "w-full flex items-center gap-2 rounded-md py-3 px-2  text-left " }`}>
          <FaBorderAll className="text-green-300 text-[25px]" />  Đơn hàng đã mua
          </button>
        </li>
        <li>
      <button onClick={() => router.push('/lich-su-mua-hang/thong-tin-ca-nhan')} type="button"  className={ `${pathname ==="/purchase-history/info-customer" ? " flex items-center gap-2 w-full bg-slate-200 rounded-md py-3 px-2  text-left font-semibold" : "w-full flex items-center gap-2 rounded-md py-3 px-2  text-left " }`}>
      <MdSwitchAccount className="text-gray-400 text-[25px]" /> 
        Thông tin và số địa chỉ</button>
        </li>
      </ul>
      <button   onClick={handleLogout} className="mt-6 py-2 px-4 w-full border border-red-500 text-red-500 font-bold">Đăng Xuất</button>
      <div className="mt-10">
        <div className="bg-yellow-100  p-4 rounded-lg">
          <p className="text-sm">Tổng điểm tích lũy: <span className="font-bold">0 điểm</span></p>
          <div className=" flex justify-between  mt-4">
            <p className="text-xs">Tải app Quà Tặng VIP</p>
            <div className="relative h-[50px] w-[50px]">
            <Image   src="/designImage/imagelogoApp/qr.png"
        alt="QR Code"
        layout="fill"
        className="object-cover "  />
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 mt-4">
           <div className=" relative w-[100px] h-[30px] ">
           <Image   src="/designImage/imagelogoApp/appstore.png"
        alt="QR Code"
        layout="fill"
        className="object-cover "  />
           </div>
           <div className=" relative w-[100px] h-[30px] ">
           <Image   src="/designImage/imagelogoApp/googleplay.png"
        alt="QR Code"
        layout="fill"
        className="object-cover "  />
           </div>
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarCustomer
