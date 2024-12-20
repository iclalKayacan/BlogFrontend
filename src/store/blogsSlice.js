import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

// Blogları API'den çekmek için async thunk
export const fetchBlogById = createAsyncThunk(
  "blogs/fetchBlogById",
  async (id) => {
    const response = await axiosInstance.get(`/Blogs/${id}`);
    return response.data;
  }
);

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    blog: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default blogsSlice.reducer;
