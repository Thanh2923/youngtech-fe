// src/store/cartSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchCartItems, addToCartThunk, updateCartItemQuantity, removeCartItem, removeCartItemIn,removeAllCartItem } from './cartThunks';
import { Item } from '@radix-ui/react-dropdown-menu';

export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface CartState {
 cartItems: CartItem[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CartState = {
 cartItems: [],
  status: 'idle',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateSelectedItems(state, action) {
      state.cartItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        const payload = action.payload
        console.log(payload)
        const existingItem = state.cartItems.filter(item => item.product_id === payload.product_id);
         
        if (existingItem) {
          // Nếu tồn tại, tăng số lượng
          existingItem.quantity += payload.quantity;
        } else {
          // Nếu không tồn tại, thêm sản phẩm vào giỏ hàng
          state.cartItems.push(payload);
        }
     
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        console.log('Action Payload:', action.payload);
        const index = state.cartItems.findIndex((item) => item.product_id  === action.payload.product_id);
        if (index !== -1) {
          state.cartItems[index].quantity = action.payload.quantity
        }
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter((item) => item.product_id !== action.payload);
      })

      .addCase(removeCartItemIn.fulfilled, (state, action) => {
        const {productId} = action.payload; 
        console.log(productId)  
        // Lọc các item trong cartItems mà product_id không có trong idsToRemove
        state.cartItems = state.cartItems.filter(item => !productId.includes(item.product_id));
      })
      .addCase(removeAllCartItem.fulfilled, (state, action) => {
       
        state.cartItems = [];
      })
  },
});

export const { updateSelectedItems } = cartSlice.actions
export default cartSlice.reducer;
