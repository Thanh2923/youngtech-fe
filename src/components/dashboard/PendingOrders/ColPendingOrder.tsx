import React from "react";

const ColPendingOrder = () => {
  return (
    <div className="content-products  border-t border-t-slate-300/50 bg-[#293038]">
      <div className="content-product-header p-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            STT
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            Mã khách hàng
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
            Tên khách hàng
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
           Đơn hàng
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
            Ngày
          </div>  
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
            Cập nhập
          </div>  
        </div>
      </div>
    </div>
  );
};
export default ColPendingOrder;
