import React from "react";

const ColCustomer = () => {
  return (
    <div className="col-content-customer  border-t border-t-slate-300/50 bg-[#293038]">
      <div className="content-product-header p-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-95%)]">
            STT
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            Tên Khách hàng
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-85%)]">
            Email
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            Số điện thoại
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
            Địa chỉ giao hàng
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            Trạng thái tài khoản
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            Lịch sử mua hàng
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
            Hành động
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColCustomer;
