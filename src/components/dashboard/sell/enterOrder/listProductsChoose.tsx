import React from "react";

interface Product {
  id: number;
  productName: string;
  productPrice: string;
  productImage: string;
  description: string;
  quantity: number;
  brand: string;
  flag: boolean;
  childCategory_id: number;
  supplier_id: number;
  images: string[];
}
interface ProductListProps {
  products: Product[];
  quantities: { [id: number]: number };
  onQuantityChange: (id: number, quantity: number) => void;
  onAddProduct: (product: Product) => void;
}
const ListProductsChoose: React.FC<ProductListProps> = ({
  products,
  quantities,
  onQuantityChange,
  onAddProduct
}) => {
  return (
    <div>
      {products.map((product) => (
        <div
          key={product.id}
          className="product-item border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]"
        >
          <div className="content-product-header p-4">
            <div className="flex items-center justify-between">
              <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-95%)]">
                {product.id}
              </div>
              <div className="font-bold  text-white/80 w-[calc(100%-70%)]">
                <span className=" text-[0.8rem]">
                  {product.productName.split("").slice(0, 10).join("")}...
                </span>
              </div>
              <div className="font-bold mr-1 text-white/80 w-[calc(100%-85%)]">
                <input
                  type="number"
                  min={1}
                  value={quantities[product.id] || 1}
                  className="w-16 border text-black/50 rounded px-2"
                  onChange={(e) =>
                    onQuantityChange(product.id, parseInt(e.target.value))
                  }
                />
              </div>
              <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
                <span className=" text-[0.8rem]">
                  {Number(product.productPrice).toLocaleString("vi-VN")}
                </span>
              </div>    
              <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
                <button
                  onClick={() => onAddProduct(product)}
                  className=" text-[0.8rem] bg-red-300 text-red-500 p-2 rounded-xl"
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListProductsChoose;
