// cartThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getSession } from 'next-auth/react';

const Api_url = process.env.NEXT_PUBLIC_API_URL;
const API_URL_Cart = `${Api_url}/cart`;

// Thunk để lấy giỏ hàng từ API
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async () => {
    const session = await getSession();
    const response = await axios.get(`${API_URL_Cart}/viewCart`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`, // Gửi token trong header
      },
    });
    return response.data.data; // Dữ liệu giỏ hàng trả về từ API
  }
);


// Thunk để thêm sản phẩm vào giỏ hàng từ API
export const addToCartThunk = createAsyncThunk(
  'cart/addToCart',
  async (cartItem: CartItem) => {
    const session = await getSession();
    const response = await axios.post(`${API_URL_Cart}/addProductToCart`, cartItem, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`, // Gửi token trong header
        },
      });
    return cartItem; // Dữ liệu sản phẩm sau khi được thêm vào giỏ hàng
  }
);

// Thunk để cập nhật sản phẩm trong giỏ hàng
export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async (updatedItem:any) => {
    const session = await getSession();
    const response = await axios.put(`${API_URL_Cart}/editCart`, updatedItem,{
      headers: {
        Authorization: `Bearer ${session?.accessToken}`, // Gửi token trong header
      },
    });
    return {
      product_id: updatedItem.product_id,  // Lấy product_id từ updatedItem
      quantity: updatedItem.quantity,      // Lấy quantity từ updatedItem
    };
  }
);

// Thunk để xóa sản phẩm khỏi giỏ hàng
export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (id: number) => {
    const session = await getSession();
    await axios.delete(`${API_URL_Cart}/removeProductId/${id}`,{
       headers: {
      Authorization: `Bearer ${session?.accessToken}`, // Gửi token trong header
    }
  }
  
  );
    return id; 
  }
);

export const removeCartItemIn = createAsyncThunk(
  'cart/removeCartItemIn',
  async (data) => {
    try {
      const session = await getSession();
      const req = await axios.delete(`${API_URL_Cart}/removeIn`, {
        headers: {
          Authorization: `Bearer${session?.accessToken}`, // Gửi token trong header
        },
        data, // Gửi dữ liệu trong phần config
      });

      return data; // Trả về dữ liệu API trả về
    } catch (error) {
      console.error('Error removing cart item:', error);
      throw error; // Đẩy lỗi lên để xử lý trong reducer
    }
  }
);
export const removeAllCartItem = createAsyncThunk(
  'cart/removeAllCartItem',
  async (_, { rejectWithValue }) => {
    try {
      const session = await getSession();
      const res = await axios.delete(`${API_URL_Cart}/removeAll`, {
        headers: {
          Authorization: `Bearer${session.accessToken}`, // Đảm bảo không có dấu cách thừa
        },
      });

      return res.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error('Error removing all cart items:', error);
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

// Thunk để xóa toàn bộ giỏ hàng
export const clearCartThunk = createAsyncThunk(
  'cart/clearCart',
  async () => {
    await axios.delete('/api/cart/clear');
    return []; // Trả về mảng rỗng khi giỏ hàng đã được xóa
  }
);
