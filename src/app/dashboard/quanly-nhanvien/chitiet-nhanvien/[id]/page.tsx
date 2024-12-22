'use client'
import React from "react";

import { ShinyRotatingBorderButton } from "@/components/dashboard/ButtonSave/BtnSave"; 
// import FormLayoutEmployee from "@/components/dashboard/employee/viewEmployee/formLayout"; 
// import ImageEmployee from "@/components/dashboard/employee/viewEmployee/imageEmployee";
import GoBack from "@/components/dashboard/GoBack";
import { useParams } from "next/navigation";
const Page = () => {
    const { id } = useParams();
  return (
    <div className="edit-product">
      <header className="mb-5">
        <h2 className="text-white/90 font-bold text-[1.2rem]">
          Chi tiết thông tin nhân viên {id}
        </h2>
       <GoBack/>
      </header>
      <div className="content-editProduct mt-10">
        <div className="flex gap-2 justify-between">
          <div className="w-[30%] show-product">
            {/* <ImageEmployee /> */}
          </div>
          <div className="w-[70%] h-full">
            <div className="bg-[#282F36]  rounded-xl  ">
              <h3 className="text-[1rem] text-white/50 p-4">
                Thông tin khách hàng
              </h3>
              <div className="border-t border-t-white/30">
                <div className="p-4"> 
                  {/* <FormLayoutEmployee /> */}
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
