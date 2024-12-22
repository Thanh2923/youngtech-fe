import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

interface SelectedProduct {
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
interface SelectedProductsListProps {
  selectedProducts: SelectedProduct[];
  onRemoveProduct: (id: number) => void;
}
const SelectedProductsList: React.FC<SelectedProductsListProps> = ({
  selectedProducts,
  onRemoveProduct
}) => {
  return (
    <div>
      {selectedProducts.map((product) => (
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
                <span className=" text-[0.8rem]">{product.quantity}</span>
              </div>

              <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
                <span className=" text-[0.8rem]">
                  {Number(product.productPrice).toLocaleString("vi-VN")}
                </span>
              </div>

             
              <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <button className=" text-[0.8rem] bg-red-300 text-red-500 p-2 rounded-xl">
                      Xóa
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tớ hỏi bạn nè !</AlertDialogTitle>
                      <AlertDialogDescription>
                        Bạn có chắc chắn muốn xóa  phẩm này không ?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Không</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onRemoveProduct(product.id)}
                      >
                        Có
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* <button onClick={() => onRemoveProduct(product.id)} className=" text-[0.8rem] bg-red-300 text-red-500 p-2 rounded-xl">
                 Xóa
              </button> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedProductsList;
