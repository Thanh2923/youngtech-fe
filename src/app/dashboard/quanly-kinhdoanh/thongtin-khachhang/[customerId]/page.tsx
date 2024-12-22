import ListOrderByCustomer from "@/components/dashboard/customers/listOrderByCustomer";
import React from "react";

const Page = () => {
  return (
    <div>
      <header className="mb-5">
        <h2 className="text-white/90 font-bold text-[1.2rem]">
          DANH SÁCH LỊCH SỬ MUA HÀNG 
        </h2>
      </header>
      <main>
          <ListOrderByCustomer></ListOrderByCustomer>
      </main>
    </div>
  );
};

export default Page;
