import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCustomersById, addCustomer, updateCustomer, removeCustomer } from './customerThunks';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  // Các trường khác nếu có
}

interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  customers: [],
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch customers
    builder.addCase(fetchCustomersById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCustomersById.fulfilled, (state, action: PayloadAction<Customer[]>) => {
      state.loading = false;
      state.customers = action.payload; 
    });
    builder.addCase(fetchCustomersById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error fetching customers';
    });

    // Add customer
    builder.addCase(addCustomer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
      state.loading = false;
      state.customers.push(action.payload);
    });
    builder.addCase(addCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error adding customer';
    });

    // Update customer
    builder.addCase(updateCustomer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
      state.loading = false;
      state.customers = action.payload; 
    });
    
    builder.addCase(updateCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error updating customer';
    });

    // Remove customer
    builder.addCase(removeCustomer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeCustomer.fulfilled, (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.customers = state.customers.filter((customer) => customer.id !== action.payload);
    });
    builder.addCase(removeCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error removing customer';
    });
  },
});

export default customerSlice.reducer;
