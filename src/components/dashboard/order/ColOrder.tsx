import React from "react";

const ColOrder = () => {
  return (
    <div className="content-products mt-2 border-t-slate-300/50 bg-[#293038]">
      <div className="content-product-header p-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-95%)]">
            STT
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
            Hình ảnh
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
           Tên sản phẩm
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-75%)]">
            Ghi chú
          </div> 
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            Giá bán
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            Số lượng
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            Thành tiền
          </div> 
        </div>
      </div>
    </div>
  );
};

export default ColOrder;
