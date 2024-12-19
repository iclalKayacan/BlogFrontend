import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AdminBlogForm = ({ onBlogAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("taslak");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = { title, content, author, status };
    onBlogAdded(newBlog);

    // Formu sıfırla
    setTitle("");
    setContent("");
    setAuthor("");
    setStatus("taslak");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 mx-auto max-w-4xl p-4 bg-white shadow rounded"
    >
      {/* Başlık */}
      <input
        type="text"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />

      {/* ReactQuill Editör */}
      <div className="mb-4">
        <ReactQuill
          value={content}
          onChange={setContent}
          style={{ height: "250px", marginBottom: "10px" }} // Alt kenar çizgisiyle arayı açar
          className="rounded"
        />
      </div>

      {/* Yazar */}
      <input
        type="text"
        placeholder="Yazar"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
        style={{ marginTop: "40px" }} 
      />

      {/* Durum */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      >
        <option value="taslak">Taslak</option>
        <option value="yayınlanmış">Yayınlanmış</option>
      </select>

      {/* Ekle Butonu */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Ekle
      </button>
    </form>
  );
};

export default AdminBlogForm;
