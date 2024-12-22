"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { TitleHome } from "../title-home/TitleHome";
import SeeMore from "../see-more/SeeMore";
import { ItemProducts } from "../product/ItemProducts";
import { fetchProducts } from "@/redux/Product/productThunks";
import { RootState, AppDispatch } from '@/redux/Store';

const BestProducts: React.FC = () => { 
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 10 }));
  }, [dispatch]);
  useEffect(() => {
    // Kiểm tra xem data có tồn tại và là mảng không
    if (data && Array.isArray(data)) {
      const intervalId = setInterval(() => {
        // Kiểm tra số lượng sản phẩm có sẵn để tránh lỗi slice
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(data.length / 5));
      }, 3000);

      return () => clearInterval(intervalId); // Dọn dẹp interval khi component bị hủy
    }
  }, [data]);

  // Kiểm tra xem data có hợp lệ trước khi slice
  const visibleProducts = data && Array.isArray(data) ? data.slice(currentIndex * 5, (currentIndex + 1) * 5) : [];
 
  return (
    <>
      <TitleHome title="Sản phẩm bán chạy nhất" />
      <div className="w-full bg-white ">
        {/* Hiển thị danh sách sản phẩm nếu có dữ liệu */}
        {loading ? <p>Loading...</p> : <ItemProducts DataProducts={visibleProducts} loading={loading} />}
        <SeeMore />
      </div>
    </>
  );
}; 
export default BestProducts;

