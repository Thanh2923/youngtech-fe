// redux/slices/addressThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch Provinces
export const fetchProvinces = createAsyncThunk('address/fetchProvinces', async () => {
  const response = await axios.get('https://api.mysupership.vn/v1/partner/areas/province');
  return response.data.results;
});

// Fetch Districts
export const fetchDistricts = createAsyncThunk(
  'address/fetchDistricts',
  async (provinceCode: string) => {
    const response = await axios.get(`https://api.mysupership.vn/v1/partner/areas/district?province=${provinceCode}`);
    return response.data.results;
  }
);

// Fetch Wards
export const fetchWards = createAsyncThunk(
  'address/fetchWards',
  async (districtCode: string) => {
    const response = await axios.get(`https://api.mysupership.vn/v1/partner/areas/commune?district=${districtCode}`);
    return response.data.results;
  }
);
