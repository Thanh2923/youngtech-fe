import React from "react";
import CustomerLayout from "@/components/dashboard/customers/CustomerLayout";
import HeaderTable from "@/components/dashboard/customers/Header_table";
import ListCustomer from "@/components/dashboard/customers/listCustomer";

const Page = () => {
  return (
    <div>
      <header className="mb-5">
        <h2 className="text-white/90 font-bold text-[1.2rem]">
          DANH SÁCH TÀI KHOẢN KHÁCH HÀNG
        </h2>
      </header>
      <main>
          <HeaderTable />
          <ListCustomer />
      </main>
    </div>
  );
};

export default Page;
