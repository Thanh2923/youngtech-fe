import React from 'react';

const InformationOrder = () => {
    return (
        <>
            <div className="info-order text-sm mt-5 bg-[#293038] rounded-xl p-3 flex flex-col gap-3">
        <div className="flex items-center gap-2 date-order">
          <p className="text-white text-[1.2rem]">Ngày đặt hàng :</p>
          <time className="text-white/60">12/3/2024</time>
        </div>
        <div className="flex items-center gap-2 fullName">
          <p className="text-white text-[1.2rem]">Họ tên :</p>
          <span className="text-white/60">Trần Văn Ý</span>
        </div>
        <div className="flex items-center gap-2 phoneNumber">
          <p className="text-white text-[1.2rem]">Số điện thoại :</p>
          <span className="text-white/60">90283902</span>
        </div>
        <div className="flex items-center gap-2 address">
          <p className="text-white text-[1.2rem]">Địa chỉ :</p>
          <address className="text-white/60">
            Câu Nhi - Điện An - Điện Bàn - Quảng Nam
          </address>
        </div>
        <div className="flex items-center gap-2 pay">
          <p className="text-white text-[1.2rem]">Thanh toán :</p>
          <span className="text-white/60">Khi nhận hàng</span>
        </div>
        <div className="flex items-center gap-2 process">
          <p className="text-white text-[1.2rem]">Trạng thái :</p>
          <span className="text-white/60">Chưa xử lý</span>
        </div>
      </div>
        </>
    );
}

export default InformationOrder;
