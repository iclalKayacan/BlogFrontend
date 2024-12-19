import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AdminBlogEdit = ({ blog, onUpdate }) => {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [status, setStatus] = useState(blog.status);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBlog = { ...blog, title, content, status };
    onUpdate(updatedBlog);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 mx-auto max-w-4xl p-4 bg-white shadow rounded"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <ReactQuill
        value={content}
        onChange={setContent}
        className="h-48"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 w-full mb-2"
        style={{ marginTop: "52px" }} 

      >
        <option value="taslak">Taslak</option>
        <option value="yayınlanmış">Yayınlanmış</option>
      </select>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Güncelle
      </button>
    </form>
  );
};

export default AdminBlogEdit;
