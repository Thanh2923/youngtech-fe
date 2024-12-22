import Image from "next/image";
import { formatCurrency } from '../formatCurrency/formatCurrency';
const ItemPay = ({CartProduct}) => {
  return (

   <div className="mt-[20px]">
               {CartProduct &&
                 CartProduct.map((cart) => {
                   // Tách chuỗi imageUrls thành mảng và lấy ảnh đầu tiên
                   const imageArray = cart.item?.imageUrls?.split(',') || [];
                   const firstImage = imageArray[0];
                   return (
                     <div key={cart.item.id} className="mb-[20px] border-b pb-3 border-gray-300 flex justify-between items-start">
                       <div className="chooseAll_product flex items-start">
                         <Image
                           width={100}
                           height={100}
                           src={`/designImage/imageProducts/${firstImage}`}  // Đảm bảo đường dẫn đúng
                           className="mx-4 w-[40px]"
                           alt={cart.item.productName}
                         />
                         <span className="text-[14px] font-semibold text-gray-500">
                           {cart.item.productName}
                         </span>
                       </div>
                       <div className="mx-5 text-[14px] text-gray-500 price">
                         {formatCurrency(cart.unitPrice)}
                       </div>
                       <div className="mx-5 text-[14px] text-gray-500 quantity">
                         {cart.quantity}
                       </div>
                       <div className="mx-5 text-[14px] text-gray-500 price">
                         {formatCurrency(cart.totalItem)}
                       </div>
                     </div>
                   );
                 })}
             </div>
  )
}

export default ItemPay
