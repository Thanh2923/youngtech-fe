"use client";
import Link from 'next/link'
import { useState,useCallback } from "react";
import NameProduct from "./NameProduct";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCartThunk, fetchCartItems } from "@/redux/Cart/cartThunks";
import Promotions from "./descriptionSmall";
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { formatCurrency } from '../formatCurrency/formatCurrency';
import { debounce } from 'lodash';
export default function InfoDetailProduct({ dataProduct }) {
  const searchParams = useSearchParams(); // Lấy tất cả các query params
  const id = searchParams.get("id");
  const { data: session, status } = useSession()
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);
  const handleAddToCart = async (quantity, id) => {

    const cartItem = {
      quantity: quantity,
      product_id: id,
    };
  
    try {
      // Dispatch và chờ kết quả từ thunk
      const result = await dispatch(addToCartThunk(cartItem)) 
  
      if (result ) {
        // Nếu API trả về trạng thái thành công
        toast.success("Thêm vào giỏ hàng thành công");
              await dispatch(fetchCartItems());
      } else {
        // Nếu API trả về thất bại hoặc không đúng định dạng
        toast.error("Không thể thêm vào giỏ hàng");
      }
    } catch (error) {
      // Hiển thị lỗi nếu thất bại
      toast.error("Thêm vào giỏ hàng thất bại");
    }
  };
  

  const handleQuantityChange = (value) => {
    // Kiểm tra nếu giá trị nhập vào là số hợp lệ và >= 1
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue >= 1) {
      setQuantity(parsedValue);  // Chỉ cập nhật quantity nếu giá trị hợp lệ
    } else if (value === "") {
      setQuantity("");  // Nếu người dùng xóa hết nội dung, cho phép giá trị là chuỗi rỗng
    }
  };
  const debouncedAddToCart = useCallback(
    debounce((quantity, id) => {
      if (session) {
        handleAddToCart(quantity, id);
      } else {
        toast.warning("Vui lòng đăng nhập");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    }, 500),
    [session, handleAddToCart]
  );
  
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev)); // Không cho phép giá trị nhỏ hơn 1

  const formattedPrice = dataProduct.productRetailPrice || 0
  const priceRetailSale = Number(dataProduct.productRetailPrice) - (Number(dataProduct.productRetailPrice) * Number(dataProduct.productSalePrice /100))

  const handleProceedToPay = () => {
    const orderDetail = [{
      unitPrice: priceRetailSale,
      quantity: quantity,
      product_id :id,
      totalItem:Number(priceRetailSale) * Number(quantity),
      item: dataProduct,
    }]
  
    // Encode JSON thành chuỗi URL-safe
    const encodedOrderDetail = encodeURIComponent(JSON.stringify(orderDetail));
  
    // Sử dụng router.push với query param
    router.push(`/pay?orderDetail=${encodedOrderDetail}`);
  };
  
  
  return (
   <>
  
    <div className="w-full mb-5 rounded-sm bg-white shadow-md">
    <ToastContainer />
      <div className="w-full p-5">
        {/* Tên sản phẩm */}
        <NameProduct data={dataProduct} fontsize={fontsize} />

     

        {/* Giá bán */}
        <div className="w-full mt-4 flex items-center gap-4">
          <p className="font-medium">Giá bán:</p>
          <strong className="price text-[18px] text-red-600">{ Number(dataProduct.productSalePrice) ===0 ? formatCurrency(formattedPrice)  : formatCurrency(priceRetailSale)}</strong>
          {
              Number(dataProduct.productSalePrice) === 0 ? "" : <div className="flex  space-x-2">
              <span className="line-through text-gray-400 text-sm">{formatCurrency(formattedPrice)}</span>
              <span className="text-red-500 text-sm">-{dataProduct.productSalePrice}%</span>
            </div>
           }
        </div>

        {/* Số lượng */}
        <div className="w-full mt-4 flex items-center gap-4">
          <label className="font-medium">Số lượng:</label>
          <div className="flex items-center gap-2">
            <button
              onClick={decrement}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-lg font-semibold"
            >
              −
            </button>
            <input
      type="text"
      value={quantity}
      onChange={(e) => handleQuantityChange(e.target.value)}
      className="w-[50px]  focus:outline-none focus:border-none px-2 py-1  border border-gray-300 rounded-md text-center"
      min={1}
    />
            <button
              onClick={increment}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-lg font-semibold"
            >
              +
            </button>
          </div>
          <div className='quantity'>
            <span className='text-sm text-gray-500'>Hàng còn : {dataProduct.quantity} sản phẩm </span>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="w-full gap-5 py-5 flex">
          <button
           disabled={isDisabled}
            type="button"
            onMouseDown={() => debouncedAddToCart(quantity, id)}
            className="bg-red-500 active:scale-95  transform duration-200 hover:bg-red-600 transition w-[200px] py-3 text-white rounded-lg text-[16px]"
          >
            Thêm vào giỏ hàng
          </button>
       
         <button
          disabled={isDisabled}
           onClick={handleProceedToPay}
            type="button"
            className="bg-slate-800 active:scale-95  transform duration-200 hover:bg-slate-900 transition w-[200px] py-3 text-white rounded-lg text-[16px]"
          >
            Mua ngay
          </button>
        
        
        </div>
       
      </div>
    </div>
     <div className="w-full  bg-white shadow-md  ">
     <Promotions/>
     </div>
   </>
  );
}

const fontsize = {
  fontSize: "22px",
};
