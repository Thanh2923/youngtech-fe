"use client";
import { ItemProducts } from './ItemProducts';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState, AppDispatch } from '@/redux/Store';
import { fetchProductsParen } from '@/redux/Product/productThunks';
import Pagination from '../pagination/Pagination';
import { useSearchParams } from "next/navigation";

const ProductParen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const idCateParen = useSelector((state: RootState) => state.categories_parent.idCateParen);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const { parenProduct, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (idCateParen) {
      dispatch(fetchProductsParen({ id: idCateParen, limit:1, page }));
    }
  }, [dispatch, idCateParen, page]);

  return (
    <>
      <ItemProducts DataProducts={parenProduct.data} loading={loading} />
      <div className="w-full py-5">
        <Pagination totalPages={parenProduct.totalPages} />
      </div>
    </>
  );
};

export default ProductParen;
