
import { MdDeleteOutline } from "react-icons/md";
import Image from "next/image";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { AlertClearCart } from "./AlertClearCart";
import { fetchCartItems, removeCartItem, updateCartItemQuantity } from "@/redux/Cart/cartThunks";
import { formatCurrency } from "../formatCurrency/formatCurrency";
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type CartItemProps = {
  item: {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    quantity: number;
    shopName: string;
    imageUrl: string;
  };
};

const CartItem: React.FC<CartItemProps> = ({item,onSelectChange }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isAlertClear, setIsAlertClear] = useState(false);
  const [idCartItem ,setIdCartItem] = useState(null);
  const [quantity,setQuantity] = useState(item.quantity);
  const priceRetail = item.productRetailPrice;
  const productSalePrice = item.productSalePrice
  const priceSale =(priceRetail) - (priceRetail * (productSalePrice /100));
  const totalRetail = priceRetail * quantity;
  const totalSale = priceSale * quantity;
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleClearItemCart = (id:number) => {
    setIsAlertClear(true);
    setIdCartItem(id)
  };

  const handleIncreaseQuantity = (newQuantity,product_id) => {
    setQuantity(newQuantity)
    const newItemCart = {
      quantity:newQuantity,
      product_id
    }
    dispatch(updateCartItemQuantity(newItemCart));
  };

  const handleDecreaseQuantity = (newQuantity,product_id) => {
   
    if (quantity > 1) {
      setQuantity(newQuantity)
    const newItemCart = {
      quantity:newQuantity,
      product_id
    }
    dispatch(updateCartItemQuantity(newItemCart));
    }else{
      setIsAlertClear(true)
    }
  };
  useEffect(()=>{
   setQuantity(item.quantity)
  },[item.quantity])

  const handleQuantityChange = (value,id) => {
    // Kiểm tra nếu giá trị nhập vào là số hợp lệ và >= 1
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue >= 1) {
      const newItemCart = {
        quantity:parsedValue,
        product_id:id
      }
      dispatch(updateCartItemQuantity(newItemCart));
    } else if (value === "") {
      setQuantity("");
      
    }
  };

  const handleClickClearItemCart = async () => {
    try {
      toast.success("Xoá 1 sản phẩm thành công")
      setIsAlertClear(false);
      await dispatch(removeCartItem(idCartItem));
      await dispatch(fetchCartItems());
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

 
  useEffect(()=>{
    setQuantity(item.quantity)
  },[item.quantity])
 
  return (
    
    <div className="bg-white py-4 px-4 border-b border-gray-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
     <ToastContainer/>
      <div className="flex lg:hidden items-center justify-between w-full">
      <input
          type="checkbox"
          checked={item.selected} 
          onChange={(e)=>onSelectChange(item.product_id,e.target.checked)}
       
        />
        <button type="button"  onClick={handleEditClick}>
          Sửa
        </button>
      </div>
      <div className="flex relative overflow-hidden items-center w-full sm:w-[30%]">
        <div
          className={`flex ${
            !isEditing ? "sm:translate-x-[0]" : "transform duration-300 ease-in-out translate-x-[-20%]"
          }`}
        >

<input
          type="checkbox"
          checked={item.selected} 
          onChange={(e)=>onSelectChange(item.product_id,e.target.checked)}
       className="mr-2 hidden sm:block"
        />
          
          <Image
            src={item.images && item.images[0] ? `/designImage/imageProducts/${item.images[0]}` : '/path/to/default/image.jpg'}
            alt={item.productName}
            width={100}
            height={100}
            className="sm:w-16 sm:h-16 mr-4 rounded"
          />
          <div className="flex-grow">
            <div className="font-semibold text-sm sm:text-base">{item.productName}</div>
            <div className="text-gray-500 text-xs sm:hidden">
              {Number(productSalePrice) ===0 ? formatCurrency(priceRetail) : formatCurrency(priceSale)}
            </div>
          </div>
        </div>
        <div
          className={`absolute top-0 flex justify-center items-center right-0 w-[20%] lg:hidden ml-auto duration-300 ease-in-out transform ${
            !isEditing ? "translate-x-[100%]" : "translate-x-0"
          } h-full bg-red-500`}
        >
          <button type="button" className="text-white">
            Xóa
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="sm:w-[12%] text-left  sm:text-center hidden sm:block">
       <div className="w-full flex gap-2 items-center ">
       <span className="font-semibold"> { Number(productSalePrice) ===0 ? formatCurrency(priceRetail) : formatCurrency(priceSale) }</span>
        {
              Number(productSalePrice) === 0 ? "" :    <div className="flex  space-x-2">
              <span className="line-through text-gray-400 text-sm">{formatCurrency(priceRetail)}</span>
              <span className="text-red-500 text-sm">-{productSalePrice}%</span>
            </div>
           }
       </div>
      </div>

      {/* Quantity */}
      <div
        className={`w-[12%] flex lg:ml-0 ${
          !isEditing ? "w-[20%] ml-[78%]" : "ml-0"
        } items-center justify-between sm:justify-center sm:text-center`}
      >
        <button
          onClick={()=>handleDecreaseQuantity(quantity - 1,item.product_id)}
          className="px-2 py-1 border border-gray-300 text-sm sm:text-base"
        >
          -
        </button>
        <input
      type="text"
      value={quantity}
      onChange={(e) => handleQuantityChange(e.target.value,item.product_id)}
      className="w-[50px]  focus:outline-none focus:border-none px-2 py-1  text-center"
      min={1}
    />
        <button
          onClick={()=>handleIncreaseQuantity(quantity + 1,item.product_id)}
          className="px-2 py-1 border border-gray-300 text-sm sm:text-base"
        >
          +
        </button>
      </div>

      {/* Total Price */}
      <div className="w-full sm:w-[10%] text-left sm:text-center text-red-500 font-semibold hidden sm:block">
         {Number(productSalePrice) ===0 ? formatCurrency(totalRetail) : formatCurrency(totalSale) }
      </div>

      {/* Delete Button */}
      <div className="hidden lg:block sm:w-[10%] flex justify-center items-center text-red-500 cursor-pointer">
        <MdDeleteOutline
          onClick={()=>handleClearItemCart(item.product_id)}
          className="text-[25px]"
        />
        {isAlertClear && <AlertClearCart handleClickClearItemCart={handleClickClearItemCart} setIsAlertClear={setIsAlertClear} />}
      </div>
    </div>
  );
};

export default CartItem;
