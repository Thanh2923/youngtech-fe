
const CartHeader: React.FC = () => (
  <div className="flex w-full px-5 py-5 bg-white justify-between  items-center border-b border-gray-300 pb-4 mb-4">
    <div className="flex w-[30%] gap-2">
    <span className="font-semibold">Sản Phẩm</span>
    </div>
    <div className=" w-[10%] text-center hidden lg:block">Đơn Giá</div>
    <div className="w-[10%] text-center hidden lg:block">Số Lượng</div>
    <div className="w-[10%] text-center hidden lg:block">Số Tiền</div>
    <div className="w-[10%] text-center hidden lg:block">Thao Tác</div>
  </div>
);

export default CartHeader;
