import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Tüm tagleri getir
export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  const response = await axios.get("https://localhost:7079/api/Tags");
  return response.data;
});

// Blog'a tag ekle
export const addTagsToBlog = createAsyncThunk(
  "tags/addTagsToBlog",
  async ({ blogId, tagIds }) => {
    const response = await axios.post(
      `https://localhost:7079/api/Tags/${blogId}/add-tags`,
      tagIds
    );
    return response.data;
  }
);

const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    tags: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default tagsSlice.reducer;
