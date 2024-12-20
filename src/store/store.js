import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogsSlice";
import categoriesReducer from "./categoriesSlice";

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    categories: categoriesReducer,
  },
});

export default store;
