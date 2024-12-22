'use client';
import React, { useEffect } from "react";
import { ShinyRotatingBorderButton } from "@/components/dashboard/ButtonSave/BtnSave";
import FormLayout from "@/components/dashboard/customers/updateCustomer/formLayout";
import ImageCustomer from "@/components/dashboard/customers/updateCustomer/imageCustomer";
import Link from "next/link";
import { useParams } from "next/navigation";
import GoBack from "@/components/dashboard/GoBack";
import { ModernSimpleInput } from "@/components/dashboard/editProduct/InputType";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
const EditCustomerPage = () => {
    const { id } = useParams();

    const {
        data: customerItem,
        isLoading,
    } = useQuery(['customer'], async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customers/getCustomerById/${id}`)
        return response.data.customers;
    });

    const schema = yup.object({
        fullName: yup.string().required('Tên hàng là bắt buộc'),
        phoneNumber: yup.string().required('Mô tả là bắt buộc'),
        address: yup.string().required('Thương hiệu là bắt buộc'),
    });

    interface FormInputs {
        fullName: string;
        phoneNumber: string;
        address: string;
    }

    const errorMapping: { [key: string]: keyof FormInputs } = {
        fullName: 'fullName',
        phoneNumber: 'phoneNumber',
        address: 'address'
    }

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
    useEffect(() => {
        if (customerItem) {
            Object.entries(customerItem).map(([key, value]) => {
                const formKey = errorMapping[key];
                if (formKey) {
                    setValue(formKey, value as any);
                }
            })
            // setUrlsImageAvailable(customerItem.images)
        }
    }, [customerItem])
    // id will contain the dynamic value
    return (
        <div className="edit-product">
            <header className="mb-5">
                <h2 className="text-white/90 font-bold text-[1.2rem]">
                    Sửa thông tin khách hàng
                </h2>
                <Link href="/dashboard/quanly-kinhdoanh/thongtin-khachhang" className="mt-3">
                    <ShinyRotatingBorderButton>Quay lại</ShinyRotatingBorderButton>
                </Link>
            </header>
            <div className="content-editProduct mt-10">
                <div className="flex gap-2 justify-between">
                    <div className="w-[100%] h-full">
                        <div className="bg-[#282F36]  rounded-xl  ">
                            <h3 className="text-[1rem] text-white/50 p-4">
                                Thông tin khách hàng
                            </h3>
                            <div className="border-t border-t-white/30">
                                <div className="p-4">
                                    <form className="flex flex-col gap-4">
                                        <div className="grid grid-cols-1">
                                            <div className="input-name flex flex-col gap-2">
                                                <label className="block text-sm font-medium text-white/50 mb-2">
                                                    Tên khách hàng
                                                </label>
                                                <ModernSimpleInput
                                                    {...register('fullName')}
                                                    className="w-72"
                                                    // onChange={(e) => setValue(e.target.value)}
                                                    placeholder="Nhập tên khách hàng..."
                                                    type="text"
                                                // value={value}
                                                />
                                            </div>
                                            <div className="input-name flex flex-col gap-2">
                                                <label className="block text-sm font-medium text-white/50 mb-2">
                                                    Số điện thoại
                                                </label>
                                                <ModernSimpleInput
                                                    {...register('phoneNumber')}
                                                    className="w-72"
                                                    // onChange={(e) => setValue(e.target.value)}
                                                    placeholder="Nhập sdt khách hàng..."
                                                    type="text"
                                                // value={value}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1">

                                            <div className="input-name flex flex-col gap-2">
                                                <label className="block text-sm font-medium text-white/50 mb-2">
                                                    Số điện thoại
                                                </label>
                                                <ModernSimpleInput
                                                    {...register('phoneNumber')}
                                                    className="w-72"
                                                    // onChange={(e) => setValue(e.target.value)}
                                                    placeholder="Nhập sdt khách hàng..."
                                                    type="text"
                                                // value={value}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="input-name flex flex-col gap-2">
                                                <label className="block text-sm font-medium text-white/50 mb-2">
                                                    Địa chỉ khách hàng
                                                </label>
                                                <ModernSimpleInput className="w-72"
                                                    {...register('address')}
                                                    // onChange={(e) => setValue(e.target.value)}
                                                    placeholder="Nhập địa chỉ khách hàng..."
                                                    type="text"
                                                // value={value}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#282F36]  rounded-xl mt-3">
                            <div className="p-4">
                                <div className="flex gap-4 items-center">
                                    <ShinyRotatingBorderButton>Hủy</ShinyRotatingBorderButton>
                                    <ShinyRotatingBorderButton>Sửa</ShinyRotatingBorderButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default EditCustomerPage;