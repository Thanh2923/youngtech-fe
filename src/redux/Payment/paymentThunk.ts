import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getSession } from 'next-auth/react';

const Api_url = process.env.NEXT_PUBLIC_API_URL;
const API_URL_Payment = `${Api_url}/payment`;

// Thunk để gửi yêu cầu thanh toán
export const processPayment = createAsyncThunk(
  'payment/processPayment',
  async (data:any, { rejectWithValue }) => {
    try {
      const session = await getSession(); // Lấy token
      const response = await axios.post(`${API_URL_Payment}/createPaymentPayOs`, data, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      return response.data; // Trả về dữ liệu từ API (ví dụ: trạng thái thanh toán)
    } catch (error) {
      console.error('Payment Error:', error);
      return rejectWithValue(error.response?.data || 'Payment failed');
    }
  }
);

// Thunk để kiểm tra trạng thái thanh toán
export const checkPaymentStatus = createAsyncThunk(
  'payment/checkPaymentStatus',
  async (paymentId: string, { rejectWithValue }) => {
    try {
      const session = await getSession();
      const response = await axios.get(`${API_URL_Payment}/status/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      return response.data; // Trả về trạng thái thanh toán
    } catch (error) {
      console.error('Payment Status Error:', error);
      return rejectWithValue(error.response?.data || 'Failed to check payment status');
    }
  }
);
