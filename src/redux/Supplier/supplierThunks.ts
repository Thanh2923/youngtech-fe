
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Supplier } from '@/types/SupplierTypes';

const Api_url = process.env.NEXT_PUBLIC_API_URL;
const API_URL = `${Api_url}/suppliers`;

export const fetchSuppliers = createAsyncThunk<Supplier[]>(
  'supplier/fetchSuppliers',
  async () => {
    const response = await fetch(`${API_URL}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Lấy token từ localStorage
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch suppliers');
    }

    const data = await response.json();
    return data.message;
  }
);