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
      return response.data; // Token ve kullanıcı bilgisi döner
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

// Async thunk for fetching user details (rehydration)
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("authToken");
    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
      const response = await axios.get("https://localhost:7079/api/Auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // Kullanıcı bilgileri döner
    } catch (error) {
      console.error("Fetch user error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue("Failed to fetch user data");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("authToken") || null, // Başlangıçta token kontrolü
    isLoading: false,
    error: null,
    isAdmin: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      localStorage.removeItem("authToken");
    },
    initializeAuth: (state, action) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        state.token = storedToken;
        // Token üzerinden kullanıcı bilgilerini ayarla
        state.user = action.payload.user || null;
        state.isAdmin = action.payload.user?.role === "admin";
      }
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
      })
      // Fetch user işlemi (rehydration)
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAdmin = action.payload.role === "admin";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.token = null;
        localStorage.removeItem("authToken"); // Token geçersizse sil
      });
  },
});

export const { logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
