// src/app/dashboard/quanly-banhang/ban-hang/page.tsx
"use client";

import FormLayout from "@/components/dashboard/sell/addCustomer/formLayout";
import { ShinyRotatingBorderButton } from "@/components/dashboard/ButtonSave/BtnSave";
import ListProductsChoose from "@/components/dashboard/sell/listProductChoose/listProductsChoose";
import { LiaAmazonPay } from "react-icons/lia";
import ColProduct from "@/components/dashboard/sell/listProductChoose/ColProduct";
import DynamicCardsVariant2 from "@/components/dashboard/payment/chooseMethod";
import EnterOrder from "@/components/dashboard/sell/enterOrder/enterOrder";
import { UserContextProvider } from "@/context/userContext"; // Import UserContextProvider

const Page = () => {
  return (
    <UserContextProvider>
      <header className="mb-5">
        <h2 className="text-white/90 font-bold text-[1.2rem]">BÁN HÀNG</h2>
      </header>
      <div className="flex gap-4">
        {/*  */}
        <div className="form-enter-informationCustomer w-[30%] bg-[#282F36] rounded-xl p-4">
          <FormLayout />
        </div>
        {/*  */}
        <div className="enter_orders w-[70%] ">
          <div className="grid grid-cols-2 gap-3">
            <div className="enterOrder bg-[#282F36] rounded-xl p-4">
              <ShinyRotatingBorderButton>
                Chọn sản phẩm từ danh sách
              </ShinyRotatingBorderButton>
              <EnterOrder />
            </div>
            <div className="bg-[#282F36] rounded-xl ">
              <div className="flex items-center justify-between rounded-tl-xl rounded-tr-xl p-4 bg-[#2F3943]">
                <h2 className="text-white/80 font-bold text-[1rem]">
                  Chọn phương thức thanh toán
                </h2>
                <LiaAmazonPay className="text-blue-500 w-10 h-10" />
              </div>
              <div className="">
                <DynamicCardsVariant2 />
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </UserContextProvider>
  );
};

export default Page;
