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
      className="mb-6 mx-auto max-w-4xl p-6 bg-backgroundGray rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-textDark mb-4">Yeni Blog Ekle</h2>
      {/* Başlık */}
      <input
        type="text"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-inputGray p-3 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {/* ReactQuill Editör */}
      <div className="mb-4">
        <ReactQuill
          value={content}
          onChange={setContent}
          style={{ height: "200px" }}
          className="rounded-lg"
        />
      </div>

      {/* Yazar */}
      <input
        type="text"
        placeholder="Yazar"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="border border-inputGray p-3 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
        style={{ marginTop: "40px" }}
      />

      {/* Durum */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-inputGray p-3 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="taslak">Taslak</option>
        <option value="yayınlanmış">Yayınlanmış</option>
      </select>

      {/* Ekle Butonu */}
      <button
        type="submit"
        className="bg-primary text-textLight px-6 py-3 rounded-lg hover:bg-secondary transition"
      >
        Ekle
      </button>
    </form>
  );
};

export default AdminBlogForm;
