import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://localhost:7079/api";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Kategoriler yükleniyor...");
      const response = await axios.get(`${API_URL}/Category`);
      console.log("Kategoriler response:", response.data);
      // API'den gelen veriyi düzenleme
      const categories = response.data.$values || response.data;
      return Array.isArray(categories) ? categories : [];
    } catch (error) {
      console.error("Kategori yükleme hatası:", error);
      return rejectWithValue(
        error.response?.data?.message || "Kategoriler yüklenemedi"
      );
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    selectedCategory: null,
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
        console.log("Kategoriler state'e yüklendi:", state.items);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error("Kategori yükleme hatası state:", action.payload);
      });
  },
});

export const { setSelectedCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
