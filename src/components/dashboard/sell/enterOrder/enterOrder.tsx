"use client";
import React, { useState, useEffect } from "react";
import ListProductsChoose from "./listProductsChoose";
import SelectedProductsList from "./SelectedProductsList";

import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_URL;
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { UserContext } from "@/app/dashboard/quanly-banhang/ban-hang/page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const EnterOrder = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { customerId, setCustomerId, orderId, setOrderId } =
  useContext(UserContext);
  const [addProduct, setAddProduct] = useState([]);
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session, status } = useSession();
  const [page, setCurrentPage] = useState(2);
  const [totalPages, setTotalPages] = useState(1); // State để lưu từ khóa tìm kiếm
  console.log(session);
  const fetchProducts = async (page) => {
    try {
      const response = await axios.get(
        `${baseURL}/product?page=${page}&limit=4`
      );
      console.log(`response`, response); // Gửi request với page và limit

      setSelectedProducts(response.data.data);
      console.log(`current page :`, response.currentPage); // Dữ liệu sản phẩm
      console.log(`current page :`, response.totalPages); // Dữ liệu sản phẩm
      setCurrentPage(response.data.currentPage); // Trang hiện tại
      setTotalPages(response.data.totalPages); // Tổng số trang
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    if (!session || !session.accessToken) {
      console.warn("Session not ready or token missing");
      return;
    }
    fetchProducts(page);
  }, [session, page]);
  console.log(selectedProducts);
  // Cập nhật số lượng trong danh sách sản phẩm
  const handleQuantityChange = (id: number, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(quantity, 1) // Đảm bảo số lượng không nhỏ hơn 1
    }));
  };
  // Thêm sản phẩm vào danh sách đã chọn
  const handleAddProduct = (product: {
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
  }) => {
    const quantity = quantities[product.id] || 1; // Nếu không nhập số lượng, mặc định là 1
    setAddProduct((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
      if (existingProduct) {
        // Nếu sản phẩm đã có, tăng số lượng thêm
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // Nếu sản phẩm chưa có, thêm mới
      return [...prev, { ...product, quantity }];
    });
    // Reset số lượng sau khi thêm
    setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
  };
  // Xóa sản phẩm khỏi danh sách đã chọn
  const handleRemoveProduct = (id: number) => {
    setAddProduct((prev) => prev.filter((item) => item.id !== id));
  };
  console.log(`selectedProducts`, selectedProducts);
  // Tính tổng tiền
  const totalPrice = addProduct.reduce(
    (total, product) => total + Number(product.productPrice) * product.quantity,
    0
  );

  const filteredProducts = selectedProducts.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProductToOrder = async () => {
    console.log(customerId, totalPrice);
    if (customerId === null || totalPrice <= 0) {
      return toast.info(
        "Vui lòng chọn khách hàng và thêm sản phẩm vào giỏ hàng"
      );
    }
    const order = {
      totalAmount: totalPrice,
      status: "Success",
      customer_id: customerId
    };
    console.log(order);

    const orderDetails = addProduct;

    console.log(orderDetails);
    const response = await axios.post(
      `${baseURL}/order/createOrderOff`,
      { order, orderDetails },
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        }
      } // Combine both into a single object
    );
    console.log(`data :`, response.data.data.orderId);
    if (response.data) {
      console.log(response.data);
      setOrderId(response.data.data.orderId);
      setAddProduct([]);
      alert("Đặt hàng thành công");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col gap-4 mt-4">
        {/* Danh sách sản phẩm từ kho */}
        <div className="">
          <h2 className="text-xl font-semibold mb-3 text-white">
            Danh sách sản phẩm:
          </h2>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-3 px-3 py-2 border-white/50 border rounded-xl"
          />
          <ListProductsChoose
            products={filteredProducts}
            quantities={quantities}
            onQuantityChange={handleQuantityChange}
            onAddProduct={handleAddProduct}
          />
          <div className="flex justify-center gap-3 items-center mt-5">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="text-black/70 p-2 text-sm rounded-2xl bg-white"
            >
              Previous
            </button>
            <span className="text-white text-sm mx-4">
              Page {page} of {totalPages}
            </span>
            <button
              className="text-black/70 text-sm p-2 rounded-2xl bg-white"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        {/* Danh sách sản phẩm đã chọn */}
        <div className="">
          <h2 className="text-xl font-semibold mb-3 text-white">
            Sản phẩm đã chọn:
          </h2>
          {
            <SelectedProductsList
              selectedProducts={addProduct}
              onRemoveProduct={handleRemoveProduct}
            />
          }
          <div className="mt-3 text-right text-white font-bold">
            Tổng tiền: {totalPrice.toLocaleString()} đ
          </div>
        </div>
      </div>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="text-right mt-5">
            <button className="px-5 py-2 text-sm rounded-2xl bg-blue-500 text-white  hover:bg-blue-600">
              Xác nhận đơn hàng
            </button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn đồng ý xác nhận đơn hàng .</AlertDialogTitle>
            <AlertDialogDescription>
              Xác nhận đơn hàng , bạn hãy nhấn tiếp tục để tiến trình được diễn
              ra tiếp tục nhé .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleAddProductToOrder}>
              Tiếp tục
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
export default EnterOrder;
