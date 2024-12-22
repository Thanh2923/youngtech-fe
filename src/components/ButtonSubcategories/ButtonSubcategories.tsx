"use client";
import FilterProduct from "./FilterProduct";
import React, { useState, useEffect } from "react";
import slugify from "../slugify/Slugify";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/Store";
import { MdClear } from "react-icons/md";
import { setIdCateChild } from "@/redux/Category/categoryChildSlice";
import { fetchCategoriesChildByParentId } from "@/redux/Category/categoryChildThunks";

const ButtonSubcategories = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [lastScrollPos, setLastScrollPos] = useState<number>(0); // Theo dõi vị trí cuộn trước đó
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const nameCategory = params.category;
  const name_category_child = params.categoryChild;
  const idCateParen = useSelector((state: RootState) => state.categories_parent.idCateParen);
  const { categoryChild } = useSelector((state: RootState) => state.categories_child);
  const handleClickDataByChild = (id: number, name: string) => {
    dispatch(setIdCateChild(id));
    const slug = slugify(name);
    router.push(`/${nameCategory}/${slug}`);
  };

  const handleClickBack = () => {
    router.push(`/${nameCategory}`);
  };

  useEffect(() => {
    if(idCateParen){
      dispatch(fetchCategoriesChildByParentId(idCateParen));
    }
   
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      // Kiểm tra cuộn xuống và cuộn lên
      if (currentScrollPos >200 && currentScrollPos > lastScrollPos) {
       
        setIsSticky(true);
      } else if (currentScrollPos < lastScrollPos) {
        // Cuộn lên
        setIsSticky(false);
      }

      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPos]);

  return (
    <div className="w-[90%] bg-white mb-5">
      <div
        id="buttonSubcategories"
        className={`transition-all duration-300 ${
          isSticky ? "fixed top-[100px] border-t-1 left-0 w-full z-10 bg-white shadow-lg" : ""
        }`}
      >
        <div className="flex flex-wrap py-5 px-5 gap-3 items-center sticky top-50 left-0 bg-white z-10">
          <FilterProduct />
          {name_category_child ? (
            <button
              type="button"
              onClick={handleClickBack}
              className="bg-slate-200 py-2 shadow-sm lg:text-[15px] flex gap-2 items-center rounded-md sm:px-5 sm:text-xs"
            >
              {name_category_child} <MdClear />
            </button>
          ) : (
            categoryChild.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleClickDataByChild(item.id, item.childCateName)}
                className="bg-slate-200 py-2 shadow-sm lg:text-[15px] hover:bg-slate-900 hover:text-white px-7 rounded-md sm:px-5 sm:text-xs"
              >
                {item.childCateName}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
    
  );
};

export default ButtonSubcategories;
