// src/features/blogs/BlogsReduxTestPage.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../store/blogsSlice"; // Yolunuzu kontrol edin

const BlogsReduxTestPage = () => {
  const dispatch = useDispatch();
  const { items: blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) return <div>Bloglar yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <p>
            <strong>Author:</strong> {blog.author}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(blog.createdAt).toLocaleString()}
          </p>
          <div>
           
          </div>
          <div>
           
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BlogsReduxTestPage;
