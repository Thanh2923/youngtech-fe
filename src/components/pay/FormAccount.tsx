"use client"
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";  // Thêm import cho Input từ ShadCN UI
import { Label } from "@/components/ui/label"; // Thêm import cho Label từ ShadCN UI 
import AddressSelector from "./AddressSelector";
import { Button } from '@/components/ui/button';
import { MdClear } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form'; // Import react-hook-form
import { updateCustomer,fetchCustomersById } from '@/redux/Customers/customerThunks';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { set } from 'date-fns';
const OrderInfoUser = ({isOpen,handleClose}) => {
  const dispatch = useDispatch();
  const [fullAddress, setFullAddress] = useState('');
  const [address,setAddress] = useState("");
  const [messger,setMessger] = useState("");
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm(); 

  const onAddressChange = (dataAddress) => {
    const { district, province, ward } = dataAddress;
    if(address !== ""){
      const fullAddress = `${address} - ${ward} - ${district} - ${province}`.replace(/-+/g, '-').trim('-');
      setFullAddress(fullAddress);
    }
  };

  const onSubmit = async (data) => {
    if(address === "" || fullAddress ==="" ){
      setMessger("Địa chỉ là bắt buột")
      return
    }
    const customerData = {
      fullName: data.name,
      phoneNumber: data.phone,
      address: fullAddress,
    }
    const res =  await dispatch(updateCustomer(customerData));
     
     if(res){
      dispatch(fetchCustomersById())
    
       toast.success("Cập nhật thông tin thành công");
      //  setTimeout(()=>{
      //   handleClose();
      //  },2000)
     }else{
      toast.warning("Lỗi khi cập nhật")
     }
  };

  return (
    <>
      {isOpen && (
        <div className={`w-full flex z-[200] motion-preset-pop motion-duration-1000 justify-center bg-slate-950 h-full bg-opacity-10 items-center fixed top-0 left-0`}>
         <ToastContainer/>
          <div className="orderInformation flex justify-center relative items-center rounded-lg shadow-md bg-white px-5 py-10 w-[55%]">
            <div className='w-[90%]'>
              <button
                onClick={handleClose}
                className="absolute top-2 right-3 text-3xl text-gray-600 hover:text-gray-900"
              >
                <MdClear />
              </button>
              <h3 className="title text-[20px] font-semibold">Thông tin đặt hàng</h3>
              <div className="formInfo mt-[20px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="info-name-phone flex items-center justify-between">
                    <div className="group/name grid w-full">
                      <Label htmlFor="name" className="font-semibold text-gray-600 text-[16px] ml-3">
                        Họ và tên
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Nhập họ và tên của bạn"
                        {...register('name', { required: 'Họ và tên là bắt buộc' })}
                        className="border outline-none p-2 rounded-2xl text-[14px] text-gray-500 border-gray-300 hover:border-pink-500"
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                  </div>

                  <div className="info-phone mt-[20px]">
                    <div className="group/phone grid">
                      <Label htmlFor="phone" className="font-semibold text-gray-600 text-[16px] ml-3">
                        Số điện thoại
                      </Label>
                      <Input
                        id="phone"
                        type="text"
                        placeholder="Nhập số điện thoại của bạn"
                        {...register('phone', { required: 'Số điện thoại là bắt buộc', pattern: { value: /^[0-9]{10}$/, message: 'Số điện thoại phải có 10 chữ số' } })}
                        className="border outline-none p-2 rounded-2xl text-[14px] text-gray-500 border-gray-300 hover:border-pink-500"
                      />
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="info-address mt-[20px]">
                    <div className="group/address grid">
                      <Label htmlFor="address" className="font-semibold text-gray-600 text-[16px] ml-3">
                        Địa chỉ
                      </Label>
                      <Input
                        id="address"
                        type="text"
                        placeholder="Địa chỉ của bạn (Ex: Đà Nẵng, Hòa Xuân)"
                        onChange={(e)=>setAddress(e.target.value)}
                        className="border outline-none p-2 rounded-2xl text-[14px] text-gray-500 border-gray-300 hover:border-pink-500"
                        
                      />
                      {messger && <p className="text-red-500 text-sm">{messger}</p>}
                    </div>
                  </div>

                  <div className="info-address mt-[20px]">
                    <div className="group/address grid">
                      <AddressSelector onAddressChange={onAddressChange} />
                    </div>
                  </div>

                  <div className="info-address w-full flex justify-center mt-[20px]">
                    <div className="group/address w-[30%] grid">
                      <Button className='p-5 transition-transform duration-150 ease-in-out active:scale-95 active:shadow-inner bg-slate-900' type="submit">Submit</Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderInfoUser;
