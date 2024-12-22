"use client";

import "../HotPromotion.css";
import { useSelector } from "react-redux";
import { RootState} from '@/redux/Store';

// Nhập interface Product
import { ItemProducts } from "./ItemProducts";

export const ProductHome: React.FC = () => {

  const {data,loading} = useSelector((state: RootState) => state.products); 
  

  return (
    <>
<ItemProducts DataProducts={data} loading={loading}/>
     
    </>
  );
};
