import ListProducts from "@/components/dashboard/gia-ban-le/listProduct";
import ProductForm from "@/components/dashboard/gia-ban-le/updateProduct";
import React from "react";


const Page = () => {
  return (
    <div>
      <header className="mb-5">
        <h2 className="text-white/90 font-bold text-[1.2rem]">
          DANH SÁCH SẢN PHẨM
        </h2>
      </header>
      <main>
          <ListProducts></ListProducts>
      </main>
    </div>
  );
};

export default Page;
