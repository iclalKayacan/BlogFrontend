import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Yorumları getirmek için bir thunk
export const fetchCommentsByBlogId = createAsyncThunk(
  "comments/fetchByBlogId",
  async (blogId) => {
    const response = await axios.get(`/api/comments?blogId=${blogId}`);
    return response.data;
  }
);

// Yorum eklemek için bir thunk
export const addComment = createAsyncThunk(
  "comments/add",
  async ({ blogId, content, author }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/comments`, {
        blogId,
        content,
        author,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByBlogId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCommentsByBlogId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload; // Gelen yorumları güncelle
      })
      .addCase(fetchCommentsByBlogId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload); // Yeni yorumu ekle
      });
  },
});

export default commentsSlice.reducer;
