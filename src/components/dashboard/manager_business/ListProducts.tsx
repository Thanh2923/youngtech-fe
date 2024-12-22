import React from "react";
import Action from "../Action/Action";
import View from "../Action/view";
import Update from "../Action/update";
import Delete from "../Action/delete";

type TableRowProps = {
  product: {
    id: number;
    name: string;
    category: string;
    image: string;
    priceOriginal: string;
    priceSale: string;
    price: string;
    date: string;
  };
};
const ListProducts = ({ product }: TableRowProps) => {
  return (
    <div className="product-item border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]">
      <div className="content-product-header p-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-95%)]">
            {product.id}
          </div>
          <div className="font-bold  text-white/80 w-[calc(100%-85%)]">
            <span className=" text-[0.8rem]">{product.name}</span>
          </div>
          <div className="font-bold  text-white/80 w-[calc(100%-90%)]">
            <span className=" text-[0.8rem]">{product.category}</span>
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            {/* <span className=" text-[0.8rem]">{product.image}</span> */}
            <img src={product.image} alt="img" className="rounded-xl w-12 h-12" />
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            <span className=" text-[0.8rem]">{product.priceOriginal}</span>
          </div>
          <div className="font-bold  text-white/80 w-[calc(100%-90%)]">
            <span className=" text-[0.8rem]">{product.priceSale}</span>
          </div>
          <div className="font-bold  text-white/80 w-[calc(100%-90%)]">
            <span className=" text-[0.8rem]">{product.price}</span>
          </div>
          <div className="font-bold  text-white/80 w-[calc(100%-90%)]">
            <span className=" text-[0.8rem]">{product.date}</span>
          </div>
          <div className="font-bold  flex items-center gap-2  w-[calc(100%-80%)]">
            <View url={``} />
            <Delete url={""} />
            <Update
              url={`/dashboard/quanly-kinhdoanh/chinhsua-sanpham/${product.id}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProducts;
