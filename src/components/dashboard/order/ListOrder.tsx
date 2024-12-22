import React from "react";
import Link from "next/link";
type TableRowProps = {
  order: {
    id: number;
    img: string;
    nameProduct: string;
    note: string;
    price: number;
    quantity: number;
  };
};
const ListOrder = ({ order }: TableRowProps) => {
  return (
    <>
    <div className="order-item border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]">
      <div className="content-product-header p-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-95%)]">
            {order.id}
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
            <img src={order.img} alt="img" className="rounded-xl w-12 h-12 object-fill" />
          </div>
          <div className="font-bold  text-white/80 w-[calc(100%-80%)]">
            <span className=" text-[0.8rem]">{order.nameProduct}</span>
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-75%)]">
            <span className=" text-[0.8rem]">{order.note}</span>
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            <span className=" text-[0.8rem]">{order.price}</span>
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            <span className=" text-[0.8rem]">{order.quantity}</span>
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            <span className=" text-[0.8rem]">
              {order.quantity * order.price}
            </span>
          </div>
        </div> 
      </div>
    </div> 
    </>
  );
};

export default ListOrder;
