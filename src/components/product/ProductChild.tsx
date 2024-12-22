"use client"
import "../HotPromotion.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState, AppDispatch } from '@/redux/Store';
import { ItemProducts } from "./ItemProducts";
import { fetchProductsChild } from "@/redux/Product/productThunks";
import { useSearchParams } from "next/navigation";
import Pagination from "../pagination/Pagination";
export const ProductChild: React.FC = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const idCateChild = useSelector((state: RootState) => state.categories_child.idCateChild);
    const {childProduct,loading} = useSelector((state: RootState) => state.products); 
    const page = parseInt(searchParams.get("page") || "1");
  useEffect(() => {  
    if(idCateChild){
      dispatch(fetchProductsChild({id:idCateChild,limit:2,page}))
    }
 
  }, [dispatch]); 

  return (

  <>
   <ItemProducts DataProducts={childProduct.data} loading={loading}/>
   <div className="w-full py-5">
        <Pagination totalPages={childProduct.totalPages} />
      </div>
  </>
  );
};
