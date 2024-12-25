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
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Bloglar yüklenirken bir hata oluştu"
      );
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
      // API'ye gönderilecek veriyi hazırla
      const postData = {
        title: blogData.title,
        content: blogData.content,
        author: blogData.author || "Anonim", // Varsayılan yazar
        summary: blogData.content.substring(0, 200), // Özet otomatik oluştur
        imageUrl: blogData.coverImage,
        tagIds: [], // Şimdilik boş bırakıyoruz
        categoryIds: [], // Şimdilik boş bırakıyoruz
      };

      const response = await axios.post(
        "https://localhost:7079/api/Blogs",
        postData
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        // API'den gelen hata mesajını kullan
        return rejectWithValue(
          error.response.data.message || "Blog eklenirken bir hata oluştu"
        );
      }
      return rejectWithValue("Sunucuya bağlanırken bir hata oluştu");
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
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Blog silinirken bir hata oluştu"
      );
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
