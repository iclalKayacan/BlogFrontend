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
      className="mb-6 mx-auto max-w-4xl p-6 bg-backgroundGray rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-textDark mb-4">Blog Düzenle</h2>
      {/* Başlık */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-inputGray p-3 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary text-textDark"
        placeholder="Başlık"
      />

      {/* ReactQuill Editör */}
      <div className="mb-4">
        <ReactQuill
          value={content}
          onChange={setContent}
          style={{ height: "200px", color: "#333" }} // Metin rengini koyulaştır
          className="rounded-lg"
        />
      </div>

      {/* Durum */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-inputGray p-3 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary text-textDark"
        style={{ marginTop: "40px" }}
      >
        <option
          value="taslak"
          style={{ color: "#9ca3af" }} // Açık gri yazı rengi
        >
          Taslak
        </option>
        <option
          value="yayınlanmış"
          style={{ color: "#10b981" }} // Yeşil yazı rengi
        >
          Yayınlanmış
        </option>
      </select>

      {/* Güncelle Butonu */}
      <button
        type="submit"
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
      >
        Güncelle
      </button>
    </form>
  );
};

export default AdminBlogEdit;
