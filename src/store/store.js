import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import blogReducer from "./blogsSlice";
import categoriesReducer from "./categoriesSlice";
import commentsReducer from "./commentsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
    categories: categoriesReducer,
    comments: commentsReducer,
  },
});

export default store;
