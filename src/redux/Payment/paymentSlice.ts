import { createSlice } from '@reduxjs/toolkit';
import { processPayment, checkPaymentStatus } from './paymentThunk';

interface PaymentState {
  paymentResult: any; // Kết quả trả về từ thanh toán
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PaymentState = {
  paymentResult: null,
  status: 'idle',
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearPaymentState(state) {
      state.paymentResult = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý thanh toán
      .addCase(processPayment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.paymentResult = action.payload; // Lưu kết quả thanh toán
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Xử lý kiểm tra trạng thái thanh toán
      .addCase(checkPaymentStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkPaymentStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.paymentResult = action.payload; // Lưu trạng thái thanh toán
      })
      .addCase(checkPaymentStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearPaymentState } = paymentSlice.actions;

export default paymentSlice.reducer;
