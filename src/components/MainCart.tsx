"use client"
import  {useEffect, useState}  from 'react';
import CartHeader from './cart/CartHeader';
import CartItem from './cart/CartItem';
import CartSummary from './cart/CartSummary';
import Breadcrumb from './Breadcrumb/Breadcrumb';
import { useDispatch, useSelector} from 'react-redux';
import { fetchCartItems } from '@/redux/Cart/cartThunks';
import EmptyCart from './cart/EmptyCart/EmptyCart';
import Loadingcss from './loadingcss/Loadingcss';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const {cartItems,loading} = useSelector(state=>state.cart);
  console.log(cartItems)
  const [cartItemS,setCartItemS] = useState(cartItems);

  const handleSelectAllChange = (selected: boolean) => {
    const updatedItems = cartItemS.map(item => ({
      ...item,
      selected
    }));
    setCartItemS(updatedItems);
  };
  
  

  const handleItemSelectChange = (id: number, selected: boolean) => {
    const updatedItems = cartItemS.map(item =>
      item.product_id === id ? { ...item, selected } : item
    );
    setCartItemS(updatedItems);
  };
  useEffect(()=>{

    dispatch(fetchCartItems())
  },[dispatch])
  
  useEffect(() => {
    if (cartItems) {
      setCartItemS(cartItems);  // Cập nhật cartItemS khi cartItems thay đổi
    }
  }, [cartItems]);
  
  if(loading){
    return (
      <Loadingcss/>
    )
  }

 

  return (

   
    <div className="w-full  mb-[100px]">
         <Breadcrumb name="Cart"/>
        <div className="lg:w-[90%] w-full m-auto">
        <CartHeader />
        {cartItemS?.length > 0 ? cartItemS.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onSelectChange={handleItemSelectChange}
          />
        )) 
        : <EmptyCart/> }
  
        {cartItemS?.length > 0  ?  <CartSummary onSelectedAllChange={handleSelectAllChange} dataCart={cartItemS} /> : ""}
       

        </div>
           </div>
  
  );
};

export default CartPage;