

const OrderInfoUser = ({userInfo}) => {
  

  return (
    <div className="orderInformation flex justify-center bg-white p-5 w-[55%]">
      <div className="w-[90%]">
        <h3 className="title text-[20px] font-semibold">Thông tin đặt hàng</h3>
        <div className="formInfo mt-[20px]">
          <form>
            {/* Full Name */}
            <div className="info-name-phone flex items-center justify-between">
              <div className="group/name grid w-full">
                <label
                  htmlFor="name"
                  className="font-semibold text-gray-600 text-[16px] ml-3"
                >
                  Họ và tên
                </label>
                <div
                  id="name"
                  className="border bg-gray-100 p-2 rounded-2xl text-[14px] text-gray-700 border-gray-300"
                >
                  {userInfo.fullName ? userInfo.fullName : "..." }
                </div>
              </div>

            
             
            </div>

             {/* Address */}
             <div className="info-address mt-[20px]">
             <div className="group/phone grid w-full">
                <label
                  htmlFor="phone"
                  className="font-semibold text-gray-600 text-[16px] ml-3"
                >
                  Số điện thoại
                </label>
                <div
                  id="phone"
                  className="border bg-gray-100 p-2 rounded-2xl text-[14px] text-gray-700 border-gray-300"
                >
                  {userInfo.phoneNumber ? userInfo.phoneNumber : "..."}
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="info-address mt-[20px]">
              <div className="group/address grid">
                <label
                  htmlFor="address"
                  className="font-semibold text-gray-600 text-[16px] ml-3"
                >
                  Địa chỉ
                </label>
                <div
                  id="address"
                  className="border bg-gray-100 p-2 rounded-2xl text-[14px] text-gray-700 border-gray-300"
                >
                  {userInfo.address ? userInfo.address : "..."}
                </div>
              </div>
            </div>

          </form>
        </div>
         
      </div>
    </div>
  );
};

export default OrderInfoUser;
