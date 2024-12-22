"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoSearch } from "react-icons/go";
import { LuHeart } from "react-icons/lu";
import { BsCart } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { usePathname } from "next/navigation";
import MenuCategory from "../categories/MenuCategory";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { useSession } from "next-auth/react";
import { fetchCartItems } from "@/redux/Cart/cartThunks";
const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const {data:session} = useSession();
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State cho input tìm kiếm
  const pathname = usePathname();
  const isAdmin = pathname.includes('/dashboard');;
  const idUser = session?.user?.id; 
  console.log(session)
  const dispatch = useDispatch();
  const {cartItems,loading} = useSelector(state=>state.cart);
  useEffect(() => {
    const handleScroll = () => {
      const topHeader = document.getElementById("topHeader")?.offsetHeight || 0;
      setIsSticky(window.scrollY > topHeader);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(()=>{
    if(session){
      dispatch(fetchCartItems())
    }
  },[dispatch])

  return (
    <>
      {!isAdmin && (
        <section>
          <header
            id="header"
            className={`transition-all  z-30
              
              duration-500 backdrop-blur-md bg-white border-b-[1px] ${
              isSticky ? "fixed top-0 bg-white w-full z-15 shadow-sm" : ""
            }`}
          >
            <div className="lg:container px-1 m-auto">
              <div className="flex  items-center">
                <div id="  logo-shop">
                  <Link href="/">
                    <Image
                      className="w-[100px] h-[100px]"
                      src="/designImage/imageLogo/logoNoBackground/2.png"
                      alt="logo"
                      width={100}
                      height={100}
                    />
                  </Link>
                </div>
                <MenuCategory />
                <div className="ml-auto">
                  <div className="flex items-center">
                    {isSearchOpen ? ( // Kiểm tra nếu trạng thái mở input search
                      <input
                        type="text"
                        placeholder="Search..."
                        className="border px-4 py-2 rounded-md focus:outline-none"
                      />
                    ) : null}
                    <ul className="p-0 flex items-center">
                      <li className="ml-[20px]">
                        <button
                          onClick={() => setIsSearchOpen(!isSearchOpen)}
                          className="block px-3 py-[20px] transition-all duration-300 border-b-2 hover:border-b-red-700 border-transparent"
                        >
                          <GoSearch className="text-[25px]" />
                        </button>
                      </li>
                      <li className="ml-[20px]">
                        <Link
                           href={idUser ? "/lich-su-mua-hang" : "/login"}
                          className="block flex items-center gap-1 px-3 py-[20px] transition-all duration-300 border-b-2 hover:border-b-red-700 border-transparent"
                        >
                          <FiUser className="text-[25px]" />
                          <h3 className="text-[20px]" >{idUser ? idUser : ""}</h3>
                        </Link>
                      </li>
                      <li className="ml-[20px]">
                        <Link
                          href="/"
                          className="block px-3 py-[20px] transition-all duration-300 border-b-2 hover:border-b-red-700 border-transparent"
                        >
                          <LuHeart className="text-[25px]" />
                        </Link>
                      </li>
                      <li className="ml-[20px]">
                        <Link
                          href="/cart"
                          className="block relative px-3 py-[20px] transition-all duration-300 border-b-2 hover:border-b-red-700 border-transparent"
                        >
                          <BsCart className="text-[25px]" />
                          <div className="w-5 h-5 absolute  flex items-center justify-center rounded-full top-0 right-0 bg-red-500 ">
                          <span className=" text-white">{idUser ? cartItems.length : 0}</span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </section>
      )}
    </>
  );
};

export default Header;
