'use client';

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import View from "../Action/view";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/Store';
import { addProductToTemp } from '@/redux/WareHouseManagement/WareHouseMannagementSlice';
import { useRouter } from 'next/navigation';
import UploadImage from '@/components/UploadImage';
import { ShinyRotatingBorderButton } from '../ButtonSave/BtnSave';


// Validation schema using Yup
const schema = yup.object({
  productName: yup.string().required('Tên hàng là bắt buộc'),
  description: yup.string().required('Mô tả là bắt buộc'),
  brand: yup.string().required('Thương hiệu là bắt buộc'),
  productPrice: yup
    .number()
    .typeError('Giá phải là số')
    .required('Giá là bắt buộc')
    .min(0, 'Giá phải lớn hơn hoặc bằng 0'),
  quantity: yup
    .number()
    .typeError('Số lượng phải là số')
    .required('Số lượng là bắt buộc')
    .min(1, 'Số lượng phải ít nhất là 1'),
  supplier_id: yup.string().required('Nhà cung cấp là bắt buộc'),
  childCategory_id: yup.string().required('ChildCategory là bắt buộc'),
  images: yup.array().min(1, 'Ít nhất phải có một ảnh').required('Ảnh là bắt buộc')
});

// Interface for form inputs
interface FormInputs {
  productName: string;
  productPrice: number;
  quantity: number;
  supplier_id: string;
  childCategory_id: string;
  description: string;
  brand: string;
  images: string[]
}

// Mapping server-side validation errors to form fields
const errorMapping: { [key: string]: keyof FormInputs } = {
  productName: 'productName',
  productPrice: 'productPrice',
  quantity: 'quantity',
  supplier_id: 'supplier_id',
  description: 'description',
  brand: 'brand',
  childCategory_id: 'childCategory_id',
  images: 'images',
};

export default function WarehouseManagement() {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter()


  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
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
// Set default values for supplier and child category fields when data is loaded
  useEffect(() => {
    if (suppliers && suppliers?.data?.length > 0) {
      setValue('supplier_id', suppliers.data[0].id);
    }
    if (childCategories && childCategories?.data?.length > 0) {
      setValue('childCategory_id', childCategories.data[0].id);
    }
  }, [suppliers, childCategories, setValue]);

  // Form submission handler
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/validate`, {
        params: data,
      });

      if (response.data.errors) {
        Object.entries(response.data.errors).forEach(([key, message]) => {
          const formKey = errorMapping[key];
          if (formKey) {
            setError(formKey, { type: 'server', message: message as string });
          }
        });
      } else {
        alert('Nhập kho thành công!');
        reset();
        dispatch(addProductToTemp(data))
      }
    } catch (error) {
      console.error('Error validating product:', error);
    }
  };

  const viewAllProduct  = () => {
    router.push('/dashboard/quanly-nhap-khohang/danh-sach')
  }

  const [urlsImage,setUrlsImage] = useState([])
  
  const handleGetArrayImage = (urlr : any)=>{
    setUrlsImage(urlr)
  }

  useEffect(() => {
    if (urlsImage?.length) {
      setValue('images',urlsImage )
    }
  },[urlsImage])

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#22282E] ">
    <div className="w-[600px] p-8 bg-[#282F36] shadow-lg rounded-lg border-md ">
      <h2 className="text-3xl font-bold text-center text-white mb-6">Nhập kho</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-white/50 mb-2">Tên hàng</label>
          <input
            {...register('productName')}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName.message}</p>}
        </div>

        {/* Album ảnh */}
        <div>
          <label className="block text-sm font-medium text-white/50 mb-2">Album ảnh</label>
          <UploadImage 
          handleGetArrayImage={handleGetArrayImage}  />
          {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-white/50 mb-2">Mô tả</label>
          <input
            {...register('description')}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
{errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-white/50 mb-2">Thương hiệu</label>
          <input
            {...register('brand')}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>}
        </div>

        {/* Product Price */}
        <div>
          <label className="block text-sm font-medium text-white/50 mb-2">Giá</label>
          <input
            {...register('productPrice')}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.productPrice && <p className="text-red-500 text-sm mt-1">{errors.productPrice.message}</p>}
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-white/50 mb-2">Số lượng</label>
          <input
            type="number"
            {...register('quantity')}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>}
        </div>

        {/* Supplier */}
        <div>
          <label className="block text-sm font-medium text-white/50 mb-2">Nhà cung cấp</label>
          <select
            {...register('supplier_id')}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          {errors.supplier_id && <p className="text-red-500 text-sm mt-1">{errors.supplier_id.message}</p>}
        </div>

        {/* Child Categories */}
        <div>
          <label className="block text-sm font-medium text-white/50 mb-2">Child Categories</label>
          <select
            {...register('childCategory_id')}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          {errors.childCategory_id && <p className="text-red-500 text-sm mt-1">{errors.childCategory_id.message}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <ShinyRotatingBorderButton type="button" onClick={viewAllProduct}>
            Xem lại
          </ShinyRotatingBorderButton>
          <ShinyRotatingBorderButton type="submit">
            Nhập thêm
          </ShinyRotatingBorderButton>
          <ShinyRotatingBorderButton type="button" onClick={() => reset()}>
            Hủy
          </ShinyRotatingBorderButton>
        </div>
      </form>
    </div>
  </div>
  );
}

