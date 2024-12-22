import { createSlice } from '@reduxjs/toolkit';
import { fetchComments,createComment,deleteComment } from './commentThunk';
import { CommentsState } from '@/types/CommentsTypes';
const initialState:CommentsState = {
  comments: [], 
  loading: false,
  error: null,
};


export const SliceComment = createSlice({
  name: 'comments', // Đổi tên slice thành 'comments'
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Comments
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch comments';
      })

      // Create Comment
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        console.error("Failed to create comment:", action.error);
      })

      // Delete Comment
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(comment => comment.id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        console.error("Failed to delete comment:", action.error);
      });
  },
});

// Xuất các actions để sử dụng trong component
export const { } = SliceComment.actions; // Không có actions nào được định nghĩa trong reducers

export default SliceComment.reducer;
