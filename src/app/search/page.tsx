"use client"
import { ItemProducts } from "@/components/product/ItemProducts"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "@/redux/Product/productThunks";
import { RootState, AppDispatch } from '@/redux/Store';
 const page = () => {
    const dispatch = useDispatch<AppDispatch>();
      const {data,loading} = useSelector((state: RootState) => state.products); 
    const Products = data.filter(item=>item.id_category === parseInt(idCateChild))
    useEffect(() => {  
    dispatch(fetchProducts())
    }, [dispatch]); 
  
  return (
   <ItemProducts DataProducts={Products} loading={loading} />
  )
}

export default page
