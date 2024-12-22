// redux/slices/addressSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchProvinces, fetchDistricts, fetchWards } from './addressThunks';

interface AddressState {
  provinces: Array<any>;
  districts: Array<any>;
  wards: Array<any>;
  loading: boolean;
  error: string | null;
}

const initialState: AddressState = {
  provinces: [],
  districts: [],
  wards: [],
  loading: false,
  error: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Provinces
      .addCase(fetchProvinces.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProvinces.fulfilled, (state, action) => {
        state.loading = false;
        state.provinces = action.payload;
      })
      .addCase(fetchProvinces.rejected, (state) => {
        state.loading = false;
        state.error = 'Lỗi khi tải tỉnh/thành phố';
      })

      // Fetch Districts
      .addCase(fetchDistricts.fulfilled, (state, action) => {
        state.districts = action.payload;
      })

      // Fetch Wards
      .addCase(fetchWards.fulfilled, (state, action) => {
        state.wards = action.payload;
      });
  },
});

export default addressSlice.reducer;
