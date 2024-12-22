'use client';

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/Store";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { removeItem, resetWareHouseMannagementItems } from "@/redux/WareHouseManagement/WareHouseMannagementSlice";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { useRouter } from "next/navigation";
import EditProduct from "./components/EditProduct";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";

type Product = {
  id: number;
  productName: string;
  description: string;
  brand: string;
  productPrice: number;
  quantity: number;
  supplier_id: string;
  childCategory_id: string;
  images: string[];
};

const ListProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { wareHouseMannagementItems } = useSelector((state: RootState) => state.wareHouseMannagement);

  const handleDelete = (index: number) => {
    dispatch(removeItem(index));
  };

  const handleUpdate = (product: Product, id: number) => {
    setSelectedProduct({ ...product, id });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const blobToBase64 = (blob: Blob) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // reader.result sẽ chứa dữ liệu Base64
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);  // Đọc Blob và chuyển thành Base64
    });
  };


  const handleAddProducts = async () => {
    const formattedData = wareHouseMannagementItems.map((item) => ({
      productName: item.productName,
      quantity: item.quantity,
      description: item.description,
      productPrice: item.productPrice,
      brand: item.brand,
      childCategory_id: item.childCategory_id,
      supplier_id: item.supplier_id,
      images: item.images || [],
    }));
  
    const totalAmount = formattedData.reduce(
      (total, product) => total + product.productPrice * product.quantity,
      0
    );
  
    // Xuất dữ liệu ra PDF
    const doc = new jsPDF();
    doc.setFont("courier", "italic");
    doc.text("Danh sách sản phẩm đã nhập", 14, 10);
  
    // Cấu hình bảng
    autoTable(doc, {
      head: [
        [
          "STT",
          "Tên sản phẩm",
          "Số lượng",
          "Mô tả",
          "Giá",
          "Thương hiệu",
          "Danh mục con",
          "Nhà cung cấp",
        ],
      ],
      body: formattedData.map((product, index) => {
        const supplier = suppliers?.data.find(
          (item) => item.id === +product.supplier_id
        );
        const childCategory = childCategories?.data.find(
          (item) => item.id === +product.childCategory_id
        );
        return [
          index + 1,
          product.productName,
          product.quantity,
          product.description,
          product.productPrice,
          product.brand,
          childCategory?.childCateName || "N/A",
          supplier?.supplierName || "N/A",
        ];
      }),
      startY: 20,
    });
  
    const pdfBlob = doc.output("blob");
    const base64 = await blobToBase64(pdfBlob);
  
    try {
      // Upload PDF lên Cloudinary
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ files: [base64] }),
      });
  
      const uploadData = await uploadResponse.json();
  
      if (!uploadResponse.ok) {
        console.error("Failed to upload PDF:", uploadData.message);
        alert("Lỗi khi tải lên file PDF.");
        return;
      }
  
      const linkPdf = uploadData.urls[0].url.replace('pdf','png')
  
      // Gửi dữ liệu sản phẩm và PDF
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/inputinvoice/addProduct`,
        formattedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (response.status !== 200) {
        alert(`Thêm sản phẩm thất bại: ${response.statusText}`);
        return;
      }
  
      // Gửi API lưu invoice
      const invoiceResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/inputinvoice/saveinputinvoice`,
        {
          totalAmount,
          linkPdf,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (invoiceResponse.status === 200) {
        alert("Thêm sản phẩm và lưu hóa đơn thành công!");
        doc.save("DanhSachSanPham.pdf");
        dispatch(resetWareHouseMannagementItems());
      } else {
        alert(`Lưu hóa đơn thất bại: ${invoiceResponse.statusText}`);
      }
    } catch (error) {
      console.error("Error in handleAddProducts:", error);
      alert("Đã xảy ra lỗi khi xử lý.");
    }
  };
  

  const { data: suppliers, isLoading: isLoadingSuppliers, isError: isErrorSuppliers } = useQuery(
    ['suppliers'],
    async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/suppliers?limit=100&offset=0`);
      return response.data;
    });

  const { data: childCategories } = useQuery(['childCategories'], async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/childcategories?limit=100&page=1`);
    return response.data;
  });

  return (
    <div className="min-h-screen p-8 bg-[#282F36] rounded-lg border-md border-[#374151]">
      <h2 className="text-3xl font-bold text-center text-white mb-6">Danh sách sản phẩm đã nhập</h2>
      {wareHouseMannagementItems.length === 0 ? (
        <p className="text-gray-400 p-4">Không có sản phẩm nào.</p>
      ) : (
        <table className="min-w-full bg-[#22282E] text-white text-left">
          <thead>
            <tr>
              <th className="px-4 py-2">Tên sản phẩm</th>
              <th className="px-4 py-2">Hình ảnh</th>
              <th className="px-4 py-2">Mô tả</th>
              <th className="px-4 py-2">Thương hiệu</th>
              <th className="px-4 py-2">Giá</th>
              <th className="px-4 py-2">Số lượng</th>
              <th className="px-4 py-2">Nhà cung cấp</th>
              <th className="px-4 py-2">Danh mục con</th>
              <th className="px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {wareHouseMannagementItems.map((product, index) => {
              const supplier = suppliers?.data.find(item => item.id === +product.supplier_id);
              const childCategory = childCategories?.data.find(item => item.id === +product.childCategory_id);

              return (
                <tr key={index} className="border-b border-gray-700">
                  <td className="px-4 py-2">{product.productName}</td>
                  <td className="px-4 py-2">
                    <img src={product?.images[0]} alt="product" className="w-10 h-10 object-cover rounded" />
                  </td>
                  <td className="px-4 py-2">{product.description.length > 30 ? `${product.description.substring(0, 50)}...` : product.description}</td>
                  <td className="px-4 py-2">{product.brand}</td>
                  <td className="px-4 py-2">{product.productPrice}</td>
                  <td className="px-4 py-2">{product.quantity}</td>
                  <td className="px-4 py-2">{supplier?.supplierName || "N/A"}</td>
                  <td className="px-4 py-2">{childCategory?.childCateName || "N/A"}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="hover:bg-blue-500 bg-[#1E293B] rounded-md w-10 h-10 flex justify-center items-center" onClick={() => handleUpdate(product as Product, index)}>
                      <FaEdit className="text-blue-400" />
                    </button>
                    <button className="hover:bg-red-500 bg-[#1E293B] rounded-md w-10 h-10 flex justify-center items-center" onClick={() => handleDelete(index)}>
                      <MdDeleteOutline className="text-red-400" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div className="flex justify-end gap-4 p-4">
        <ShinyRotatingBorderButton type="button" onClick={() => router.back()}>Hủy</ShinyRotatingBorderButton>
        <ShinyRotatingBorderButton type="button" onClick={handleAddProducts}>Thêm</ShinyRotatingBorderButton>
      </div>
      {isModalOpen && selectedProduct && (
        <EditProduct handleCloseModal={handleCloseModal} selectedProduct={selectedProduct} />
      )}
    </div>
  );
};

export default ListProduct;
