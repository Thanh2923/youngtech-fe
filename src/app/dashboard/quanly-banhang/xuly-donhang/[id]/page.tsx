import React from "react";
import LayoutListOrder from "@/components/dashboard/order/LayoutListOrder";
import ColOrder from "@/components/dashboard/order/ColOrder";
import ListOrder from "@/components/dashboard/order/ListOrder";
import InformationOrder from "@/components/dashboard/order/InformationOrder";
import GoBack from "@/components/dashboard/GoBack";
import TotalOrder from "@/components/dashboard/order/totalOrder";
const Page = () => {
  interface Order {
    id: number;
    img: string;
    nameProduct: string;
    note: string;
    price: number;
    quantity: number;
  }
  const listOrder: Order[] = [
    {
      id: 1,
      img: "https://picsum.photos/200/300",
      nameProduct: "Product 1",
      note: "Product 1 note",
      price: 100,
      quantity: 2
    },
    {
      id: 2,
      img: "https://picsum.photos/200/300",
      nameProduct: "Product 1",
      note: "Product 1 note",
      price: 100,
      quantity: 2
    },
    {
      id: 3,
      img: "https://picsum.photos/200/300",
      nameProduct: "Product 1",
      note: "Product 1 note",
      price: 100,
      quantity: 2
    },
    {
      id: 4,
      img: "https://picsum.photos/200/300",
      nameProduct: "Product 1",
      note: "Product 1 note",
      price: 100,
      quantity: 2
    },
    {
      id: 5,
      img: "https://picsum.photos/200/300",
      nameProduct: "Product 1",
      note: "Product 1 note",
      price: 100,
      quantity: 2
    }
  ];
  return (
    <div>
      <header className="mb-5">
        <h2 className="text-white/90 font-bold text-[1.2rem]">MÃ ĐƠN HÀNG</h2>
      </header>
      <GoBack/>
      {/* information order */}
       <InformationOrder/>
      {/* order detail */}
      <LayoutListOrder>
        <ColOrder />
        <div className="list-customer">
          {listOrder.map((order, index) => (
            <ListOrder key={index} order={order} />
          ))} 
        </div>
      </LayoutListOrder>
      <TotalOrder/> 
    </div>
  );
};

export default Page;
