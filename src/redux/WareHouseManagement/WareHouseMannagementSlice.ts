// src/store/wareHouseMannagementSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export interface WareHouseMannagementItem {
    childCategory_id: string;
    supplier_id: string;
    quantity: number;
    productPrice: number;
    brand: string;
    description: string;
    productName: string;
    images: string[];
}

interface WareHouseMannagementState {
 wareHouseMannagementItems:WareHouseMannagementItem[];
 isLoading: boolean
 isError: boolean
}
 
const initialState:WareHouseMannagementState = {
 wareHouseMannagementItems: [],
 isLoading: false,
 isError: false
};
const wareHouseMannagementSlice = createSlice({
  name: 'wareHouseMannagement',
  initialState,
  reducers: {
    resetWareHouseMannagementItems(state) {
      state.wareHouseMannagementItems = [],
      state.isLoading = false,
      state.isError = false
    },

    resetError(state) {
      state.isError = false 
    },

    addProductToTemp(state, action) {
      state.wareHouseMannagementItems.push(action.payload)
    },
    updateProduct(state, action) {
      const {data, id}  = action.payload
      console.log('<< data >>', data);
      const isDuplicate = state.wareHouseMannagementItems.some((item, index) =>  item.productName === data.productName && index !== id
      )
      if (isDuplicate) {
        state.isError = true
        return
      }

        state.isError = false
        state.wareHouseMannagementItems[id] = {...state.wareHouseMannagementItems[id], ...data}
     },
    removeItem(state, action) {
      state.wareHouseMannagementItems = state.wareHouseMannagementItems.filter((_, index) => index !== action.payload )
  },
  },
});

export const { addProductToTemp, removeItem , updateProduct, resetError, resetWareHouseMannagementItems} = wareHouseMannagementSlice.actions
export default wareHouseMannagementSlice.reducer;
