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
      // Token ve kullanıcı bilgisi döner
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed!"
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
      console.error("Register error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed!"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
    isAdmin: false, // Admin kontrolü için
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      localStorage.removeItem("authToken"); // Token silme
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
        state.token = action.payload.token || null;
        state.user = action.payload.user || null;
        state.isAdmin = action.payload.user?.role === "admin";

        // Token'ı localStorage'a kaydet
        if (action.payload.token) {
          localStorage.setItem("authToken", action.payload.token);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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
