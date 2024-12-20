import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogsSlice";

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
  },
});

export default store;
