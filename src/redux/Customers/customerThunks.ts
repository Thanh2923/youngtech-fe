import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getSession } from 'next-auth/react';

// URL API
const Api_url = process.env.NEXT_PUBLIC_API_URL;
const API_URL_Customers = `${Api_url}/customers`;

// Thunk để lấy danh sách khách hàng từ API
export const fetchCustomersById = createAsyncThunk(
  'customers/fetchCustomersById',
  async () => {
    const session = await getSession();
    const response = await axios.get(`${API_URL_Customers}/viewCustomerById`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`, // Gửi token trong header
      },
    });
    return response.data; // Dữ liệu khách hàng trả về từ API
  }
);

// Thunk để thêm khách hàng mới
export const addCustomer = createAsyncThunk(
  'customers/addCustomer',
  async (customerData: any) => {
    const session = await getSession();
    const response = await axios.post(`${API_URL_Customers}/add`, customerData, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`, // Gửi token trong header
      },
    });
    return response.data.data; // Dữ liệu khách hàng mới đã được thêm
  }
);

export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async (updatedCustomerData: Partial<Customer>, { rejectWithValue }) => {
    try {
      const session = await getSession();
      const response = await axios.put(
        `${API_URL_Customers}/updateCustomer`,
        updatedCustomerData,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`, // Gửi token trong header
          },
        }
      );
      return response.data;
    } catch (error: any) {
      // Xử lý lỗi
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra");
    }
  }
);


// Thunk để xóa khách hàng
export const removeCustomer = createAsyncThunk(
  'customers/removeCustomer',
  async (customerId: number) => {
    const session = await getSession();
    await axios.delete(`${API_URL_Customers}/delete/${customerId}`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`, // Gửi token trong header
      },
    });
    return customerId; // Trả về ID khách hàng đã bị xóa
  }
);
