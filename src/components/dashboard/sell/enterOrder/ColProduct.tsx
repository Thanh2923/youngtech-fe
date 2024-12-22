import React from "react";

const ColProduct = () => {
  return (
    <div className="col-content-customer mt-5  border-t border-t-slate-300/50 bg-[#293038]">
      <div className="content-product-header p-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            STT
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-70%)]">
            Sản phẩm 
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            Số lượng
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
           Đợn giá
          </div> 
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
           Thành tiền
          </div> 
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            Hành động
          </div> 
        </div>
      </div>
    </div>
  );
};

export default ColProduct;
