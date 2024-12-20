import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://localhost:7079/api/Auth/login",
        credentials
      );
      console.log("Response from backend:", response.data); // Backend'den dönen yanıt
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message); // Hata logu
      return thunkAPI.rejectWithValue(
        error.response?.data || "Giriş yapılamadı!"
      );
    }
  }
);

// Async thunk for register
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://localhost:7079/api/auth/register",
        userData
      );
      return response.data; // Başarı mesajı döner
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Kayıt yapılamadı!"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Giriş yapmış kullanıcı bilgisi
    token: null, // JWT token
    isLoading: false, // Async işlemler için durum
    error: null, // Hata mesajı
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login işlemi
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.Token; // Backend'den dönen JWT
        state.user = action.payload.User; // Kullanıcı bilgisi
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Hata mesajı
      })
      // Register işlemi
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
