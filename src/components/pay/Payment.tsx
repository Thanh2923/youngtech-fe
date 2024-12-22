import React, { useState } from 'react'
import Image from "next/image";
import { TbTruckDelivery } from 'react-icons/tb';

const Payment = ({selectedPayment,handleChange}) => {


  return (
    <>
      <h3 className="title text-[20px] mt-[40px] font-semibold">Hình thức thanh toán</h3>
      <div className="payment-method mt-[20px]">

      
        <div className="wrap border mt-[10px] p-3 border-gray-300 rounded-xl">
          <div className="method flex items-center">
          <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={selectedPayment === "COD"}
              onChange={handleChange}
              className={`w-6 h-6 rounded-full border-2 ${selectedPayment === "COD" ? "bg-red-500" : "bg-white"} border-gray-400 focus:outline-none`}
            />
            <TbTruckDelivery className="mx-6 text-[2.5rem] text-gray-400" />
            <div className="grid">
            <span className="text-[14px] text-black">COD</span>
            <span className="text-[14px] text-black">Thanh toán khi nhận hàng</span>
            </div>
          </div>
        </div>
        <div className="wrap border mt-[10px] p-3 border-gray-300 rounded-xl">
          <div className="method flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="ZaloPay"
              checked={selectedPayment === "ZaloPay"}
              onChange={handleChange}
              className={`w-6 h-6 rounded-full border-2 ${selectedPayment === "ZaloPay" ? "bg-red-500" : "bg-white"} border-gray-400 focus:outline-none`}
            />
            <Image width={50} alt="ZaloPay" height={50} src="/designImage/imageLogo/logoPay/logo-zalopay.svg" className="mx-5 w-[40px] h-[40px]" />
            <div className="grid">
              <span className="text-[14px] text-black">Ví điện tử ZaloPay</span>
              <span className="text-[14px] text-black">
                Zalopay Wallet / ATM Card / Internet Banking / Visa Card / VietQR / Apple Pay
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
