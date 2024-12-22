
"use client";
import { LuShoppingCart } from "react-icons/lu";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="cart_empty mt-[100px]">
      <h3 className="text-red-500 text-[14px] text-center">
        Giỏ hàng của bạn hiện đang trống. Hãy mua sắm ngay nhé!
      </h3>
      <LuShoppingCart className="mx-auto text-red-500 mt-3 text-[2rem]" />
      <div className="mt-[20px] text-center">
        <Link href="/product" className=" ">
          <button className="py-2 px-4 rounded-xl border border-gray-300 text-[14px] bg-gray-300 hover:bg-black hover:text-white text-red-500 font-semibold">
            Mua Hàng nào
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
