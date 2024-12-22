// categoryParentThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Category_Paren } from '@/types/CategoryTypes';
const Api_url = process.env.NEXT_PUBLIC_API_URL
const API_URL_PARENT = `${Api_url}/parencategories`;

export const fetchCategoriesParent = createAsyncThunk(
  'categories/fetchCategoriesParent',
  async () => {
    const response = await axios.get(API_URL_PARENT);
    return response.data.data;
  }
);


export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (newCategory:Category_Paren) => {
    const response = await axios.post(API_URL_PARENT, newCategory);
    return response.data.data;
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (category:Category_Paren) => {
    const response = await axios.put(`${API_URL_PARENT}/${category.id}`, category);
    return response.data.data;
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id:number) => {
    await axios.delete(`${API_URL_PARENT}/${id}`);
    return id;
  }
);
