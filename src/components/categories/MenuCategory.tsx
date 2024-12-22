"use client";
import { TfiMenu } from "react-icons/tfi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesParent } from "@/redux/Category/categoryParentThunks";
import slugify from "../slugify/Slugify";
import { useRouter } from 'next/navigation';
import { RootState, AppDispatch } from '@/redux/Store';
import { setIdCateParen } from "@/redux/Category/categoryParentSlice";
const MenuCategory = () => {
  const [isShow, SetisShow] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {data} = useSelector((state: RootState) => state.categories_parent);
  const handleCickShow = () => {
    SetisShow(!isShow);
  };

  const handleClickPreview = (id: number, name: string) => {
    dispatch(setIdCateParen(id))
    const slug = slugify(name);
    router.push(`/${slug}`);
  };


 
  useEffect(() => {
    dispatch(fetchCategoriesParent());
    
  }, [dispatch]);

  return (
    <>
      {/* Menu trên màn hình desktop */}
      <div className="ml-4  hidden lg:block" id="menu">
        <ul style={textColor} className="p-0 flex items-center">
          {data && data.map((cate: any) => (
            <li key={cate.id} className="mx-4 my-0">
              <button 
                type="button"
                onClick={() => handleClickPreview(cate.id, cate.name)}
                className="capitalize font-sans py-[20px] whitespace-nowrap text-gray-900 border-b-2 border-transparent duration-300 text-[18px] transition-all hover:border-b-red-700 cursor-pointer font-semibold hover:text-black pb-[20px]"
              >
                {cate.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Menu trên màn hình di động */}
      <div className="ml-4 block lg:hidden" id="menu">
        <TfiMenu
          onClick={handleCickShow}
          className="cursor-pointer font-bold text-[30px] z-50"
        />
        {isShow && (
          <ul
            style={textColor}
            className="p-0 z-100 fixed top-[100px] left-0 w-[50%] h-screen border bg-white shadow-2xl"
          >
            {data && data.map((cate: any) => (
              <li key={cate.id} className=" w-full">
                <button
                  type="button"
                  onClick={() => handleClickPreview(cate.id, cate.name)}
                  className="capitalize w-full flex font-sans whitespace-nowrap text-gray-900 border-b-2 border-transparent duration-300 text-[18px] transition-all hover:bg-slate-200 hover:text-red-500 cursor-pointer font-semibold px-5 py-4"
                >
                  {cate.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default MenuCategory;

const textColor = {
  color: "#767676",
  padding: "15px",
};
