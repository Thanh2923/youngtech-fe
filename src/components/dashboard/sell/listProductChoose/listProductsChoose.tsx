import React from "react";

type TableRowProps = {
  product: {
    id: number;
    nameProduct: string;
    quantity: number;
    price: number;
  };
};
const ListProductsChoose = ({ product }: TableRowProps) => {
  return (
    <div className="product-item border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]">
      <div className="content-product-header p-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            {product.id}
          </div>
          <div className="font-bold  text-white/80 w-[calc(100%-70%)]">
            <span className=" text-[0.8rem]">{product.nameProduct}</span>
          </div>
          <div className="font-bold  text-white/80 w-[calc(100%-80%)]">
            <span className=" text-[0.8rem]">{product.quantity}</span>
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
            <span className=" text-[0.8rem]">{product.price}</span>
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
            <span className=" text-[0.8rem]">
              {product.quantity * product.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProductsChoose;
