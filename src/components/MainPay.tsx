"use client"
import OrderInfoUser from "@/components/pay/OrderInfoUser";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import PayCart from "@/components/pay/PayCart";
import FormAccount from "@/components/pay/FormAccount";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCustomersById } from "@/redux/Customers/customerThunks";
import { useSearchParams } from 'next/navigation';
const MainPay = () => {
  const dispatch = useDispatch();
    const { customers } = useSelector((state) => state.customers);
    console.log(customers)
     const [isOpen, setIsOpen] = useState(false); 
    const [userInfo, setUserInfo] = useState({
      fullName: "",
      phoneNumber: "",
      address: "",
    });
    const searchParams = useSearchParams();
    const orderDetailParam = searchParams.get('orderDetail');
    const orderDetailParamCart = searchParams.get('orderDetailCart');

    // Giải mã danh sách sản phẩm từ URL
    const CartProduct = orderDetailParam ? JSON.parse(decodeURIComponent(orderDetailParam)) : [];
    const CartProductOrder = orderDetailParamCart ? JSON.parse(decodeURIComponent(orderDetailParamCart)) : [];
    const result = CartProductOrder.flatMap(group =>
      group.item.map(item => ({
        unitPrice:
          Number(item.productSalePrice) !== 0
            ? (Number(item.productRetailPrice) - (Number(item.productRetailPrice) * (Number(item.productSalePrice) / 100)))
            : Number(item.productRetailPrice),
        quantity: item.quantity,
        totalItem:  (Number(item.productRetailPrice) - (Number(item.productRetailPrice) * (Number(item.productSalePrice) / 100))) * item.quantity,
        product_id :item.product_id,
        cartId:item.cart_id,
        item: item
      }))
    );
    const totalOrder =  CartProduct.reduce(
      (total, item) => total + Number(item.unitPrice * item.quantity ),
      0
    );

    const totalOrderCart =  result.reduce(
      (total, item) => total + Number(item.totalItem ),
      0
    );



    const handleClose = () => {
      setIsOpen(false);
    };
    const handleOpen = () => {
      setIsOpen(true);
    };
 

    useEffect(() => {
      if (customers?.customers && customers?.customers.fullName !=="" && customers?.customers.phoneNumber !==""  ) {
        setUserInfo({
          fullName: customers.customers.fullName || "",
          phoneNumber: customers.customers.phoneNumber || "",
          address: customers.customers.address || "",
        });
      }else{
        setIsOpen(true)
      }
    }, [customers]);

 
  return (
   <div className="w-full mb-10 flex flex-col justify-center items-center">
    <Breadcrumb name={"Thanh toán"}/>
    <FormAccount isOpen={isOpen} handleClose={handleClose}/>
    <section  className="pay w-[95%]">
      <div className="flex gap-5 justify-between">
      <OrderInfoUser userInfo={userInfo}/>
        <PayCart 
          userInfo={userInfo} 
           handleOpen={handleOpen}
            totalOrder={totalOrder}
             CartProduct={CartProduct}
              CartProductOrder={result}
              totalOrderCart={totalOrderCart}
              />
             
      </div>
    </section>
   </div>
  );
};

export default MainPay;
