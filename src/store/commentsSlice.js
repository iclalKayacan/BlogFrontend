import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://localhost:7079/api";

// Yorum ekleme
export const addComment = createAsyncThunk(
  "comments/addComment",
  async (commentData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const user = getState().auth.user; // Kullanıcı bilgisini al

      if (!token) {
        throw new Error("Oturum açmanız gerekiyor!");
      }

      // Backend'in beklediği formata uygun veri gönder
      const response = await axios.post(
        `${API_BASE_URL}/Comments`,
        {
          Content: commentData.Content,
          BlogId: commentData.BlogId,
          Author: user?.username || user?.email || commentData.Author, // Kullanıcı bilgisini ekle
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data);
      return response.data;
    } catch (err) {
      // Özel hata mesajları
      if (err.response?.data?.errors?.Author) {
        return rejectWithValue("Bir hata oluştu, lütfen tekrar deneyin.");
      }

      return rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Yorum eklenirken bir hata oluştu"
      );
    }
  }
);

// Yorum güncelleme
export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ id, content }) => {
    const response = await axios.put(
      `${API_BASE_URL}/Comments/${id}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return { id, content };
  }
);

// Yorum silme
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (id) => {
    await axios.delete(`${API_BASE_URL}/Comments/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return id;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Comment
      .addCase(addComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments.push(action.payload);
        state.error = null;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Yorum eklenirken bir hata oluştu";
      })
      // Update Comment
      .addCase(updateComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(
          (comment) => comment.id === action.payload.id
        );
        if (index !== -1) {
          state.comments[index].content = action.payload.content;
        }
      })
      // Delete Comment
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload
        );
      });
  },
});

export default commentsSlice.reducer;
