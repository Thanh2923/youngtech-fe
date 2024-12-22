import React from "react";

const ColInvoice = () => {
  return (
    <div className="content-products mt-2 border-t-slate-300/50 bg-[#293038]">
      <div className="content-product-header p-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-95%)]">
            STT
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
            Mã order 
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
           Số lượng order 
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-75%)]">
           Tê<noscript></noscript> Sản phẩm
          </div> 
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
            Thành tiền
          </div> 
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            Xem
          </div> 
        </div>
      </div>
    </div>
  );
};

export default ColInvoice;
