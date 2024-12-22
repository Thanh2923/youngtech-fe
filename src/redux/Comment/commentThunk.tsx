
import { Comments } from '@/types/CommentsTypes';
import {  createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://localhost:3000/comments"; // Thay đổi API_URL nếu cần

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);


export const createComment = createAsyncThunk(
  'comments/createComment',
  async (newComment:Comments) => {
    const response = await axios.post(API_URL, newComment);
    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (id:number) => {
    await axios.delete(`${API_URL}/${id}`);
    return id; 
  }
);
