// src/features/blogs/blogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API URL’si (kendi backend adresinize göre güncelleyin)
const API_URL = "https://localhost:7079/api/Blogs";

// Tüm blogları çek
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      console.log("fetchBlogs çağrıldı. API_URL:", API_URL);

      const response = await axios.get(API_URL);

      console.log("fetchBlogs response.data:", response.data);

      // Burada '$values' kontrolü yaparak array'i çıkarıyoruz
      const rawData = response.data;
      let blogsArray = [];

      if (rawData && Array.isArray(rawData.$values)) {
        // Asıl blog dizisi: rawData.$values
        blogsArray = rawData.$values;
      } else {
        // Eğer $values yoksa ve zaten array ise onu kullan
        // Veya tekil obje ise [rawData] şeklinde diziye dönüştürebilirsiniz
        if (Array.isArray(rawData)) {
          blogsArray = rawData;
        } else {
          // Tek obje veya null ise
          blogsArray = rawData ? [rawData] : [];
        }
      }

      return blogsArray; // blog listesi
    } catch (error) {
      console.error("fetchBlogs error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  "blogs/fetchBlogById",
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    // API yanıtını console'a yazdırarak kontrol edelim
    console.log("Blog API Response:", response.data);
    return response.data;
  }
);

// Yeni blog oluştur
export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, blogData);
      return response.data; // Eklenen blog
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Blog güncelle
export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ blogId, blogData }, { rejectWithValue }) => {
    try {
      await axios.put(`${API_URL}/${blogId}`, blogData);
      return { blogId, ...blogData };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Blog sil
export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (blogId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${blogId}`);
      return blogId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ----- SLICE TANIMI -----
const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    items: [], // Tüm bloglar
    currentBlog: null, // Detay sayfasında gösterilen tek blog
    loading: false,
    error: null,
  },
  reducers: {
    // Senkron aksiyonlar gerekiyorsa buraya ekleyebilirsiniz
  },
  extraReducers: (builder) => {
    builder
      // fetchBlogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Artık net bir array
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchBlogById
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentBlog = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentBlog = null;
      })

      // createBlog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        // Yeni eklenen blogu listeye ekle
        state.items.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateBlog
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (b) => b.id === action.payload.blogId
        );
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...action.payload,
          };
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteBlog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((blog) => blog.id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
