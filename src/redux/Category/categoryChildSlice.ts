// categoryChildSlice.ts
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { fetchCategoriesChild, createCategoryChild, updateCategoryChild, deleteCategoryChild,fetchCategoriesChildByParentId,fetchNameParentCategoriesByChildId } from './categoryChildThunks';
import { CategoryChildState } from '@/types/CategoryTypes';
import Cookies from 'js-cookie';
const initialState: CategoryChildState = {
  categoryChild: [],
  nameCategory:[],
  loading: false,
  error: null,
  idCateChild: Cookies.get('idCateChild') || null,
};

const SliceCategoryChild = createSlice({
  name: 'categoriesChild',
  initialState,
  reducers: {
    setIdCateChild: (state, action: PayloadAction<number | null>) => {
      state.idCateChild = action.payload; // Cập nhật state
      if (action.payload) {
        Cookies.set('idCateChild', action.payload); // Lưu vào localStorage
      } else {
        Cookies.remove('idCateChild'); // Xóa nếu payload là null
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch danh mục con
      .addCase(fetchCategoriesChild.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesChild.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryChild = action.payload;
      })
      .addCase(fetchCategoriesChild.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch child categories';
      })

      .addCase(fetchNameParentCategoriesByChildId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNameParentCategoriesByChildId.fulfilled, (state, action) => {
        state.loading = false;
        state.nameCategory = action.payload;
      })
      .addCase(fetchNameParentCategoriesByChildId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch child categories';
      })

      .addCase(fetchCategoriesChildByParentId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesChildByParentId.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryChild = action.payload;
      })
      .addCase(fetchCategoriesChildByParentId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch child categories';
      })

      // Thêm danh mục con
      .addCase(createCategoryChild.fulfilled, (state, action) => {
        state.categoryChild.push(action.payload);
      })
      .addCase(createCategoryChild.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to create category';
      })

      // Cập nhật danh mục con
      .addCase(updateCategoryChild.fulfilled, (state, action) => {
        const index = state.categoryChild.findIndex(category => category.id === action.payload.id);
        if (index !== -1) {
          state.categoryChild[index] = action.payload;
        }
      })
      .addCase(updateCategoryChild.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update category';
      })

      // Xóa danh mục con
      .addCase(deleteCategoryChild.fulfilled, (state, action) => {
        state.categoryChild = state.categoryChild.filter(category => category.id !== action.payload);
      })
      .addCase(deleteCategoryChild.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete category';
      });
  },
});

export const { setIdCateChild } = SliceCategoryChild.actions;

export default SliceCategoryChild.reducer;
