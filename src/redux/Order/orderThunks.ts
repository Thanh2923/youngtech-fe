import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getSession } from 'next-auth/react';

const Api_url = process.env.NEXT_PUBLIC_API_URL;
const API_URL_Orders = `${Api_url}/order`;

// Thunk để tạo đơn hàng
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({order, orderDetails,cartId, cartItems}, { rejectWithValue }) => {
    try {
      const session = await getSession();
      const response = await axios.post(`${API_URL_Orders}/createOrder`,{order, orderDetails,cartId, cartItems}, {
        headers: {
          Authorization: ` ${session?.accessToken}`, // Gửi token trong header
        },
      });
      return response.data; // Trả về dữ liệu đơn hàng vừa tạo
    } catch (error) {
      console.error('Error creating order:', error);
      return rejectWithValue(error.response?.data || 'Unable to create order');
    }
  }
);

// Thunk để lấy danh sách đơn hàng
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const session = await getSession();
      const response = await axios.get(`${API_URL_Orders}/list`, {
        headers: {
          Authorization: ` ${session?.accessToken}`, // Gửi token trong header
        },
      });
      return response.data; // Trả về danh sách đơn hàng
    } catch (error) {
      console.error('Error fetching orders:', error);
      return rejectWithValue(error.response?.data || 'Unable to fetch orders');
    }
  }
);

// Thunk để cập nhật trạng thái đơn hàng
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async (updateData: { orderId: string; status: string }, { rejectWithValue }) => {
    try {
      const session = await getSession();
      const response = await axios.put(
        `${API_URL_Orders}/update/${updateData.orderId}`,
        { status: updateData.status },
        {
          headers: {
            Authorization: ` ${session?.accessToken}`, // Gửi token trong header
          },
        }
      );
      return response.data; // Trả về đơn hàng đã cập nhật
    } catch (error) {
      console.error('Error updating order status:', error);
      return rejectWithValue(error.response?.data || 'Unable to update order status');
    }
  }
);
