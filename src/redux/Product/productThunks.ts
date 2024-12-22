// productThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '@/types/productTypes';

const Api_url = process.env.NEXT_PUBLIC_API_URL;
const API_URL = `${Api_url}/product`;

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, limit }) => {  
    const params = {};

    
    if (page) {
      params.page = page;
    }

    if (limit) {
      params.limit = limit;
    }

    const response = await axios.get(`${API_URL}`, { params });
    return response.data.data;
  }
);

export const fetchProductsParen = createAsyncThunk(
  'products/fetchProductParen',
  async ({ id, limit, page }: { id: number; limit: number; page: number }) => {
    const params: { [key: string]: number } = {};

    if (page) params.page = page;
    if (limit) params.limit = limit;

    const response = await axios.get(`${API_URL}/parentCategory/${id}`, { params });
    return response.data;
  }
);

export const fetchProductsId = createAsyncThunk(
  'products/fetchProductsId',
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  }
);
export const fetchProductsChild = createAsyncThunk(
  'products/fetchProductChild',
  async ({ id, limit, page }: { id: number; limit: number; page: number }) => {
    const params: { [key: string]: number } = {};

    if (page) params.page = page;
    if (limit) params.limit = limit;

    const response = await axios.get(`${API_URL}/childCategory/${id}`, { params });
    return response.data;
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (newProduct: Product) => {
    const response = await axios.post(API_URL, newProduct);
    return response.data.data;
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (product: Product) => {
    const response = await axios.put(`${API_URL}/${product.id}`, product);
    return response.data.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);
