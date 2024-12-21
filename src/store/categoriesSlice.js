import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://localhost:7079/api";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get(`${API_BASE_URL}/Category`);
    return response.data;
  }
);

export const fetchBlogsByCategory = createAsyncThunk(
  "categories/fetchBlogsByCategory",
  async (categoryId) => {
    const response = await axios.get(
      `https://localhost:7079/api/Category/${categoryId}/blogs`
    );
    return response.data; // API'den dönen blogları döndür
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [], // Kategoriler
    blogsByCategory: [], // Seçilen kategoriye ait bloglar
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Yeni thunk için extraReducers
      .addCase(fetchBlogsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogsByCategory = action.payload; // Gelen blogları sakla
      })
      .addCase(fetchBlogsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
