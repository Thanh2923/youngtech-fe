'use client'
import React, { useEffect } from "react";
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
import { useRouter } from "next/navigation";

const UpdatePricePage = () => {
  const { id } = useParams();
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
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/suppliers/${id}`);
      return response.data;
    }
  );


  // Fetch child categories using React Query
  const {
    data: childCategories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery(['childCategories'], async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/childcategories/${id}`);
    return response.data.data;
  });

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
  const router = useRouter();

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
      Object.entries(productItem).map(([key, value]) => {
        const formKey = errorMapping[key];
        if (formKey) {
          setValue(formKey, value as any);
        }
      })
      // setUrlsImageAvailable(productItem.images)
    }
  }, [productItem])

  useEffect(() => {
    if (childCategories?.childCateName) {
      setValue('childCategory_id', childCategories.childCateName as string);
    }
  }, [childCategories])

  useEffect(() => {
    if (suppliers?.supplierName) {
      setValue('supplier_id', suppliers.supplierName as string);
    }
  }, [suppliers])
  // id will contain the dynamic value


  const onSubmit = async (data: any) => {
    console.log(data)


    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/product/updatePrices/${id}`, {
          productRetailPrice: data.productRetailPrice,
          productSalePrice: data.productSalePrice

        }, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.status === 200) {
          alert("Chỉnh sửa thành công!");
          // tải file pdf
        } else {
          alert(`Chỉnh sửa thất bại`);
        }
      } catch (error) {
        console.error("Error adding products:", error);
        alert("Đã xảy ra lỗi khi sửa.");
      }
  };



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
              <div className="img">
                <img
                  src={productItem?.images[0].imageUrl}
                  alt="dell-inspiron-15-3520-i5-img.jpg"
                  className="rounded-xl"
                />
              </div>
              <div className="name">
                <h3 className="text-white/50 text-[1.2rem]">
                  {productItem?.description}
                </h3>
              </div>
              {/* <div className="price">
                <p className="text-[1.2rem] text-white/50 mb-2">Giá:</p>
                <div className="items-center gap-4 flex">
                  <del className="price-origin text-[0.9rem] text-white/40">
                    120.000
                  </del>
                  <span className="price text-[1.1rem] text-white/80">
                    100.000
                  </span>
                  <span className="discount text-[0.9rem] text-white/60">
                    (20%)
                  </span>
                </div>
              </div> */}
            </div>
          </div>
          <div className="w-[70%] h-full">
            <div className="bg-[#282F36]  rounded-xl mb-3">
              <div className="p-4">
                <ShinyRotatingBorderButton onClick={() =>
              router.push("/dashboard/quanly-kinhdoanh/giaban-le")
            }>Quay lại</ShinyRotatingBorderButton>
              </div>
            </div>
            <div className="bg-[#282F36]  rounded-xl  ">
              <h3 className="text-[1rem] text-white/50 p-4">
                Thông tin sản phẩm
              </h3>
              <div className="border-t border-t-white/30">
                <div className="p-4">
                  <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-4">
                    <div className="grid grid-cols-2">
                      <div className="input-name flex flex-col gap-2">
                        <label className="block text-sm font-medium text-white/50 mb-2">
                          Tên sản phẩm
                        </label>
                        <ModernSimpleInput
                          disabled
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
                          disabled
                          {...register('productPrice')}
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
                        <ModernSimpleInput
                          disabled

                          {...register('supplier_id')}
                          className="w-72"
                          placeholder="Nhập giá gốc..."
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="input-sale flex flex-col gap-2 ">
                        <label className="block text-sm font-medium text-white/50 mb-2">
                          Danh mục con
                        </label>
                        <ModernSimpleInput
                          disabled
                          {...register('childCategory_id')}
                          className="w-72"
                          placeholder="Nhập giá gốc..."
                          type="text"
                        // value={childCategories?.childCateName}
                        />
                      </div>
                      <div className="input-sale flex flex-col gap-2 ">
                        <label className="block text-sm font-medium text-white/50 mb-2">
                          Thương hiệu
                        </label>
                        <ModernSimpleInput
                          disabled
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
                          <ShinyRotatingBorderButton type="submit" onClick={() =>
              router.push("/dashboard/quanly-kinhdoanh/giaban-le")
            }>Sửa</ShinyRotatingBorderButton>
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