import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import blogReducer from "./blogsSlice";
import categoriesReducer from "./categoriesSlice";
import commentsReducer from "./commentsSlice";
import tagsReducer from "./tagsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
    categories: categoriesReducer,
    comments: commentsReducer,
    tags: tagsReducer,
  },
});

export default store;
