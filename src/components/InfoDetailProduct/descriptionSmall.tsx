import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

export default function Promotions() {
  const promotions = [
    {
      icon: <FaCheckCircle className="text-green-500" />,
      text: "Xem chính sách ưu đãi dành cho thành viên Smember",
    },
    {
      icon: <FaCheckCircle className="text-green-500" />,
      logo: "logo-techcombank.webp", // Đường dẫn logo ngân hàng
      text: "Giảm đến 500K khi thanh toán bằng thẻ ghi nợ Techcombank",
    },
    {
      icon: <FaCheckCircle className="text-green-500" />,
      logo: "logo-vnpay.webp",
      text: "Giảm đến 500K khi thanh toán qua VNPAY-QR",
    },
    {
      icon: <FaCheckCircle className="text-green-500" />,
      logo: "logo-homecredit.png",
      text: "Giảm đến 400K khi thanh toán bằng thẻ tín dụng Home Credit",
    },
    {
      icon: <FaCheckCircle className="text-green-500" />,
      logo: "logo-sacombank.png",
      text: "Giảm đến 1 triệu khi trả góp bằng thẻ Visa Sacombank qua MPOS",
    },
    {
      icon: <FaCheckCircle className="text-green-500" />,
      logo: "logo-hsbc.webp",
      text: "Hoàn tiền đến 2 triệu khi mở thẻ tín dụng HSBC",
    },
    {
      icon: <FaCheckCircle className="text-green-500" />,
      logo: "logo-kredivo.webp",
      text: "Giảm đến 700.000đ khi thanh toán qua Kredivo",
    },
    {
      icon: <FaCheckCircle className="text-green-500" />,
      text: "Liên hệ B2B để được tư vấn giá tốt nhất cho khách hàng doanh nghiệp khi mua số lượng nhiều",
    },
  ];

  return (
    <div className="w-full max-w-lg mx-auto p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
        ƯU ĐÃI THÊM
      </h2>
      <ul className="space-y-4">
        {promotions.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            {item.icon}
            {item.logo && (
              <Image
                src={`/designImage/imagelogoApp/${item.logo}`}
                alt="Logo"
                width={24} // Chiều rộng hình ảnh
                height={24} // Chiều cao hình ảnh
                className="object-contain"
              />
            )}
            <p className="text-gray-700 text-sm">{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
