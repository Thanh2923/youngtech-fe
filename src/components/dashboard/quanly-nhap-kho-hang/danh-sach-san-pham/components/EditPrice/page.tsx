'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import FileDropzone from "@/components/dashboard/editProduct/DropFile/DropFile";
import { Input } from "@/components/ui/input";
import { ModernSimpleInput } from "@/components/dashboard/editProduct/InputType";
import InputName from "@/components/dashboard/editProduct/InputName";
import InputPrice from "@/components/dashboard/editProduct/InputPrice";
import InputDate from "@/components/dashboard/editProduct/InputDate";
import InputPriceOrigin from "@/components/dashboard/editProduct/InputPriceOrigin";
import InputPriceSale from "@/components/dashboard/editProduct/InputPriceSale";
import { InputCategory } from "@/components/dashboard/editProduct/InputCategory";
import { ShinyRotatingBorderButton } from "@/components/dashboard/ButtonSave/BtnSave";
import { useParams } from "next/navigation";
import GoBack from "@/components/dashboard/GoBack";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import UploadImage from "@/components/UploadImage";
import { useRouter } from "next/navigation";

const UpdatePricePage = () => {
  const { id } = useParams();

  const [imageOfProduct, setImageOfProduct] = useState([])
    const [urlsImage, setUrlsImage] = useState([])
  
    const handleGetArrayImage = (urlr: any) => {
      setUrlsImage(urlr)
    }
  const {
    data: productItem,
    isLoading,
  } = useQuery(['product'], async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`)
    return response.data.data;
  });

  // Fetch suppliers using React Query
  const { data: suppliers, isLoading: isLoadingSuppliers, isError: isErrorSuppliers } = useQuery(
    ['suppliers'],
    async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/suppliers?limit=100&offset=0`);
      return response.data;
    }
  );

  // Fetch child categories using React Query
  const {
    data: childCategories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery(['childCategories'], async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/childcategories?limit=100&page=1`);
    return response.data;
  });

  const router = useRouter();

  const schema = yup.object({
    brand: yup.string().required('Tên thương hiệu là bắt buộc'),
    childCategory_id: yup.string().required('Danh mục cha là bắt buộc'),
    createAt: yup.string().required('Ngày tạo là bắt buộc'),
    description: yup.string().required('Mô tả là bắt buộc'),
    productName: yup.string().required('Tên là bắt buộc'),
    productPrice: yup.string().required('Giá là bắt buộc'),
    productRetailPrice: yup.string().notRequired(),
    productSalePrice: yup.string().notRequired(),
    quantity: yup.number().required('Số lượng là bắt buộc'),
    supplier_id: yup.string().required('Nhà cung cấp bắt buộc'),
  });

  interface FormInputs {
    brand: string
    childCategory_id: string
    createAt: string
    description: string
    productName: string
    productPrice: string
    productRetailPrice: yup.Maybe<string | undefined>
    productSalePrice: yup.Maybe<string | undefined>
    quantity: number
    supplier_id: string
  }
  const errorMapping: { [key: string]: keyof FormInputs } = {
    brand: 'brand',
    childCategory_id: 'childCategory_id',
    createAt: 'createAt',
    description: 'description',
    productName: 'productName',
    productPrice: 'productPrice',
    productRetailPrice: 'productRetailPrice',
    productSalePrice: 'productSalePrice',
    quantity: 'quantity',
    supplier_id: 'supplier_id',
  }

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (productItem) {
      setImageOfProduct((productItem.images.map((item: any) => item.imageUrl)))
      Object.entries(productItem).map(([key, value]) => {
        const formKey = errorMapping[key];
        if (formKey) {
          setValue(formKey, value as any);
        }
      })
    }
  }, [productItem])


  // const onSubmit = async (data: any) => {
  //   console.log('23423',imageOfProduct)

  //   try {
  //     const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/product/editProduct/${id}`, {
  //       data: data,
  //       images: imageOfProduct
  //     }, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.status === 200) {
  //       alert("Chỉnh sửa thành công!");
  //       // tải file pdf
  //     } else {
  //       alert(`Chỉnh sửa thất bại`);
  //     }
  //   } catch (error) {
  //     console.error("Error adding products:", error);
  //     alert("Đã xảy ra lỗi khi sửa.");
  //   }
  // };
  const onSubmit = async (data: any) => {
    console.log('23423', imageOfProduct);
  
    try {
      // Gọi API edit product
      const editResponse = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/product/editProduct/${id}`,
        {
          data: data,
          images: imageOfProduct
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (editResponse.status === 200) {
        alert("Chỉnh sửa thành công!");
  
        // Chuẩn bị payload cho API update image
        const imageUpdatePayload = {
          images: imageOfProduct.map((imageUrl: string) => ({ imageUrl })),
          productId: id
        };
  
        // Gọi API update image
        const imageUpdateResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/image/update/${id}`,
          imageUpdatePayload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (imageUpdateResponse.status === 200) {
          alert("Cập nhật ảnh thành công!");
          // Thực hiện hành động khác nếu cần
        } else {
          alert("Cập nhật ảnh thất bại.");
        }
      } else {
        alert("Chỉnh sửa sản phẩm thất bại.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Đã xảy ra lỗi khi xử lý.");
    }
  };

  const handleDelete = (id: number) => {
    const remove = imageOfProduct.filter((_, index: number) => index !== id)
    setImageOfProduct(remove)
  }

  useEffect(() => {
    if (urlsImage?.length) {
      setImageOfProduct((prev) => [...prev, ...urlsImage])
    }

  }, [urlsImage])

  console.log(imageOfProduct)

  return (
    <div className="edit-product">
      <header className="mb-5">
        <h2 className="text-white/90 font-bold text-[1.2rem]">
          Chỉnh sửa sản phẩm
        </h2>
      </header>
      <div className="content-editProduct mt-10">
        <div className="flex gap-2 justify-between">
          <div className="w-[30%] show-product">
            <div className="bg-[#282F36] p-4 flex flex-col gap-y-3 rounded-xl">
              {imageOfProduct?.map((item: string, index: number) => (
                <div className="img relative" key={index}>
                  <img
                    src={item}
                    alt={`product-image-${index}`}
                    className="rounded-xl w-full h-auto"
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 text-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
                    onClick={() => handleDelete(index)} // Thêm logic xoá tại đây
                  >
                    Xoá
                  </button>
                </div>
              ))}
                <UploadImage handleGetArrayImage={handleGetArrayImage} />

            </div>
          </div>
          <div className="w-[70%] h-full">
            <div className="bg-[#282F36]  rounded-xl mb-3">
              <div className="p-4">
                <ShinyRotatingBorderButton onClick={() =>
              router.push("/dashboard/quanly-nhap-khohang/danh-sach-san-pham")
            }>Quay lại</ShinyRotatingBorderButton>
              </div>
            </div>
            <div className="bg-[#282F36]  rounded-xl  ">
              <h3 className="text-[1rem] text-white/50 p-4">
                Thông tin sản phẩm
              </h3>
              <div className="border-t border-t-white/30">
                <div className="p-4">
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2">
                      <div className="input-name flex flex-col gap-2">
                        <label className="block text-sm font-medium text-white/50 mb-2">
                          Tên sản phẩm
                        </label>
                        <ModernSimpleInput
                          {...register('productName')}
                          className="w-72"
                          placeholder="Nhập tên sản phẩm..."
                          type="text"
                        />
                      </div>
                      <div className="input-sale flex flex-col gap-2 ">
                        <label className="block text-sm font-medium text-white/50 mb-2">
                          {/* Giá bán ra */}
                          Giá gốc sản phẩm
                        </label>
                        <ModernSimpleInput
                          className="w-72"
                          {...register('productPrice')}
                          type="text"
                        />
                      </div>


                      <div className="input-sale flex flex-col gap-2 ">
                        <label className="block text-sm font-medium text-white/50 mb-2">
                          {/* Giá bán ra */}
                          Số lượng
                        </label>
                        <ModernSimpleInput
                          className="w-72"
                          {...register('quantity')}
                          type="text"
                        />
                      </div>

                      <div className="input-sale flex flex-col gap-2 ">
                        <label className="block text-sm font-medium text-white/50 mb-2">
                          {/* Giá bán ra */}
                          Mô tả
                        </label>
                        <ModernSimpleInput
                          className="w-72"
                          {...register('description')}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="input-sale flex flex-col gap-2 ">
                        <label className="block text-sm font-medium text-white/50 mb-2">
                          Ngày sửa
                        </label>
                        <ModernSimpleInput
                          disabled
                          {...register('createAt')}
                          className="w-72 cursor-pointer"
                          placeholder="Nhập ngày..."
                        />
                      </div>
                      <div className="input-price flex flex-col gap-2">
                        <label className="block text-sm font-medium text-white/50 mb-2">
                          Nhà cung cấp
                        </label>
                        <select
                          {...register('supplier_id')}
                          className="w-full p-3 border border-[#4B5563] rounded bg-[#1F2937] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {isLoadingSuppliers && <option>Đang tải...</option>}
                          {isErrorSuppliers && <option>Không thể tải danh sách</option>}
                          {suppliers &&
                            suppliers.data?.map((supplier: any) => (
                              <option key={supplier.id} value={supplier.id} className="text-black">
                                {supplier.supplierName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="input-sale flex flex-col gap-2 ">
                        <label className="block text-sm font-medium text-white/50 mb-2">
                          Danh mục con
                        </label>
                        <select
                          {...register('childCategory_id')}
                          className="w-full p-3 border border-[#4B5563] rounded bg-[#1F2937] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {isLoadingCategories && <option>Đang tải...</option>}
                          {isErrorCategories && <option>Không thể tải danh sách</option>}
                          {childCategories &&
                            childCategories?.data?.map((category: any) => (
                              <option key={category.id} value={category.id} className="text-black">
                                {category.childCateName}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="input-sale flex flex-col gap-2 ">
                        <label className="block text-sm font-medium text-white/50 mb-2">
                          Thương hiệu
                        </label>
                        <ModernSimpleInput
                          {...register('brand')}
                          className="w-72"
                          placeholder="Nhập giá gốc..."
                          type="text"
                        // value={childCategories?.childCateName}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2">
                      <div className="input-sale flex flex-col gap-2 ">
                        <label className="block text-sm font-medium text-white/50 mb-2">
                          Giá sale
                        </label>
                        <ModernSimpleInput
                          disabled
                          {...register('productSalePrice')}
                          className="w-72"
                          placeholder="Nhập giá sale..."
                          type="text"
                        // value={childCategories?.childCateName}
                        />
                      </div>
                      <div className="input-sale flex flex-col gap-2 ">
                        <label className="block text-sm font-medium text-white/50 mb-2">
                          Giá bán lẻ
                        </label>
                        <ModernSimpleInput
                          disabled
                          {...register('productRetailPrice')}
                          className="w-72"
                          placeholder="Nhập giá bán lẻ..."
                          type="text"
                        // value={childCategories?.childCateName}
                        />
                      </div>
                    </div>
                    <div className="bg-[#282F36]  rounded-xl mt-3">
                      <div className="p-4">
                        <div className="flex gap-4 items-center">
                           <ShinyRotatingBorderButton  type="submit" onClick={() => {
  setTimeout(() => {
    router.push("/dashboard/quanly-nhap-khohang/danh-sach-san-pham");
  }, 3000); // 3 giây
}}
>
                                      Lưu thay đổi
                                    </ShinyRotatingBorderButton>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePricePage;