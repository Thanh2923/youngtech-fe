import React from "react";

import { ShinyRotatingBorderButton } from "@/components/dashboard/ButtonSave/BtnSave";
import FormLayout from "@/components/dashboard/customers/addCustomer/formLayout";
import ImageCustomer from "@/components/dashboard/customers/addCustomer/imageCustomer";
import Link from "next/link";
const Page = () => {
  return (
    <div className="edit-product">
      <header className="mb-5">
        <h2 className="text-white/90 font-bold text-[1.2rem]">
          Thêm thông tin khách hàng
        </h2>
        <Link href="/dashboard/quanly-kinhdoanh/thongtin-khachhang" className="mt-3">
          <ShinyRotatingBorderButton>Quay lại</ShinyRotatingBorderButton>
        </Link>
      </header>
      <div className="content-editProduct mt-10">
        <div className="flex gap-2 justify-between">
          <div className="w-[30%] show-product">
            <ImageCustomer />
          </div>
          <div className="w-[70%] h-full">
            <div className="bg-[#282F36]  rounded-xl  ">
              <h3 className="text-[1rem] text-white/50 p-4">
                Thông tin khách hàng
              </h3>
              <div className="border-t border-t-white/30">
                <div className="p-4"> 
                  <FormLayout />
                </div>
              </div>
            </div>
            <div className="bg-[#282F36]  rounded-xl mt-3">
              <div className="p-4">
                <div className="flex gap-4 items-center">
                  <ShinyRotatingBorderButton>Hủy</ShinyRotatingBorderButton>
                  <ShinyRotatingBorderButton>Thêm</ShinyRotatingBorderButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
