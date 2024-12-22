// src/Supplier/supplierSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Supplier, SupplierState } from '@/types/SupplierTypes';
import { fetchSuppliers } from './supplierThunks';

const initialState: SupplierState = {
  data: [],
  loading: false,
  error: null,
};

const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Khi fetchSuppliers thành công
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action: PayloadAction<Supplier[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Có lỗi khi tải dữ liệu';
      });
    },

    });

export default supplierSlice.reducer;
