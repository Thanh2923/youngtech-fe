// categoryParentSlice.ts
import { createSlice ,PayloadAction} from '@reduxjs/toolkit';
import { fetchCategoriesParent, createCategory, updateCategory, deleteCategory } from './categoryParentThunks';
import { CategoryParenState } from '@/types/CategoryTypes';
import Cookies from 'js-cookie';
const initialState:CategoryParenState = {
  data: [],
  loading: false,
  error: null,
  idCateParen:  Cookies.get('idCateParen') || null,
};

const SliceCategoryParent = createSlice({
  name: 'categoriesParent',
  initialState,
  reducers: {
    setIdCateParen: (state, action: PayloadAction<string | null>) => {
      state.idCateParen = action.payload; // Cập nhật state
      if (action.payload) {
        Cookies.set('idCateParen', action.payload); // Lưu vào localStorage
      } else {
        Cookies.remove('idCateParen'); // Xóa nếu payload là null
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Categories Parent
      .addCase(fetchCategoriesParent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesParent.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategoriesParent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch parent categories';
      })
      // Create Category
      .addCase(createCategory.fulfilled, (state, action) => {
       state.data.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.error = action.error.message || "Failed to create category";
      })
      // Update Category
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index =state.data.findIndex(category => category.id === action.payload.id);
        if (index !== -1) {
         state.data[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update category";
      })
      // Delete Category
      .addCase(deleteCategory.fulfilled, (state, action) => {
       state.data =state.data.filter(category => category.id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete category";
      });
  },
});

export const { setIdCateParen } = SliceCategoryParent.actions;
export default SliceCategoryParent.reducer;
