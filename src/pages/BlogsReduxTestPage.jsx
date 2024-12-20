import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios"; // Axios instance'ı import ediyoruz

const BlogsReduxTestPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get("/Blogs");
        setBlogs(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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
            <strong>Categories:</strong>
            <ul>
              {blog.categories.map((category) => (
                <li key={category.id}>{category.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Comments:</strong>
            <ul>
              {blog.comments.map((comment) => (
                <li key={comment.id}>
                  <p>
                    {comment.content} by {comment.author}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BlogsReduxTestPage;
