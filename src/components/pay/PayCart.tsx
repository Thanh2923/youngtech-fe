import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsChatDots } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '../formatCurrency/formatCurrency';
import { createOrder, fetchOrders } from '@/redux/Order/orderThunks';
import { fetchCustomersById } from '@/redux/Customers/customerThunks';
import AlertPay from './AlertPay';
import ItemPay from './ItemPay';
import ItemCartPay from './ItemCartPay';
import Payment from './Payment';
import { processPayment } from '@/redux/Payment/paymentThunk';

const PayCart = ({ userInfo, handleOpen, totalOrder, CartProduct, CartProductOrder, totalOrderCart }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const { customers } = useSelector((state) => state.customers.customers);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Handle alert modal for payment
  const handleAlert = () => {
    setIsLoading(true);
    setModalMessage('Đang xử lý đặt hàng...');
    setShowModal(true);
    setTimeout(() => {
      setIsLoading(false);
      setModalMessage('Đặt hàng thành công !');
      setTimeout(() => setShowModal(false), 3000);
    }, 2000);
  };

  // Handle payment logic
  const handlePayment = async () => {
    if (userInfo.fullName === '' || userInfo.phoneNumber === '') {
      handleOpen();
      return;
    }

    let orderDetails = [];
    let order = {};
    let cartId = null;
    let cartItems = [];

    if (CartProduct && totalOrder > 0) {
      orderDetails = CartProduct.map((item) => ({
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        product_id: item.product_id,
      }));
      order = {
        totalAmount: Number(totalOrder) + 50000,
        status: 'Pending',
        customer_id: Number(customers.id),
      };
    } else {
      cartId = CartProductOrder[0]?.cartId;
      cartItems = CartProductOrder.map((cart) => cart.item);
      orderDetails = CartProductOrder.map((item) => ({
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        product_id: item.product_id,
      }));
      order = {
        totalAmount: Number(totalOrderCart) + 50000,
        status: 'Pending',
        customer_id: Number(customers.id),
      };
    }

    if (selectedPayment) {
      const req = await dispatch(createOrder({ order, orderDetails, cartId, cartItems }));
      if (req?.meta?.requestStatus === 'fulfilled' && req.payload) {
        if (selectedPayment === 'COD') {
          handleAlert();
        } else if (selectedPayment === 'ZaloPay') {
           const orderId = req.payload.data.orderId;
            const data = {
                orderId
            }
      
           if (data) {
             // Gọi action processPayment với orderId
             const request = await dispatch(processPayment(data));
             console.log('Payment Request:', request);
             if(request && request?.payload?.result){
              const url = request?.payload?.result.checkoutURL;
              setTimeout(()=>{
                router.push(url)
              },1000)
             }

           } else {
             toast.error('Không có Order ID');
           }
             
        }
      } else {
        toast.error('Lỗi vui lòng kiểm tra lại');
      }
    } else {
      toast.warning('Vui lòng chọn phương thức thanh toán');
    }
  };

 const hanldeCloseAler = ()=>{
    setShowModal(false);
    router.push("/");
  }

  useEffect(() => {
    dispatch(fetchCustomersById());
  }, [dispatch]);

  return (
    <div className="cart-price p-5 flex justify-center bg-white w-[45%]">
      <ToastContainer />
      <AlertPay isVisible={showModal} onClose={hanldeCloseAler} isLoading={isLoading} message={modalMessage} />
      <div className="total-price w-[90%]">
        <h3 className="title text-[20px] font-semibold">Sản phẩm</h3>
        <div className="productsList mt-[20px]">
          <div className="header flex justify-between items-center">
            <div className="chooseAll_product flex items-center">
              <span className="mr-5 text-[15px] font-semibold text-gray-600">Brand Sản phẩm</span>
              <button className="cursor-pointer flex items-center text-[15px] font-semibold text-green-600 p-2 rounded-xl border border-gray-300">
                <BsChatDots className="mx-2" /> <span>Chat ngay</span>
              </button>
            </div>
            <div className="mx-5 text-[15px] font-semibold text-gray-600 quantity">Số lượng</div>
            <div className="mx-5 text-[15px] font-semibold text-gray-600 price">Giá</div>
          </div>

          {CartProduct && <ItemPay CartProduct={CartProduct} />}
          {CartProductOrder && <ItemCartPay DataCartOrder={CartProductOrder} />}

          <div className="pay">
            <div className="total flex justify-between items-center">
              <span className="text-[14px] text-gray-500">Tổng tiền hàng</span>
              <span className="text-[14px] text-gray-500">
                {totalOrder ? formatCurrency(Number(totalOrder)) : formatCurrency(Number(totalOrderCart))}
              </span>
            </div>
            <div className="delivery my-[20px] flex justify-between items-center">
              <span className="text-[14px] text-gray-500">Phí vận chuyển</span>
              <span className="text-[14px] text-gray-500">{formatCurrency(50000)}</span>
            </div>
            <div className="total flex justify-between items-center">
              <span className="text-[14px] text-gray-500">Tổng thanh toán</span>
              <span className="text-[18px] py-2 px-5 border border-red-500 hover:bg-red-700 hover:text-white duration-200 transition-all rounded-xl cursor-pointer text-red-500">
                {totalOrder ? formatCurrency(Number(totalOrder) + 50000) : formatCurrency(Number(totalOrderCart) + 50000)}
              </span>
            </div>
          </div>
        </div>

        <Payment selectedPayment={selectedPayment} handleChange={(e) => setSelectedPayment(e.target.value)} />

        <div className="w-full flex py-5 justify-center">
          <button
            type="button"
            onClick={handlePayment}
            className="w-[40%] py-2 shadow-md hover:bg-red-600 text-white rounded-md shadow-red-500 px-10 bg-red-500 active:scale-95 active:shadow-none transition duration-150"
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayCart;
