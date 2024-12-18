import React, { useState } from "react";

const AdminBlogFormPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, content, category });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Yeni Blog Ekle / Düzenle
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700">Başlık</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Seçiniz</option>
            <option value="Teknoloji">Teknoloji</option>
            <option value="Sağlık">Sağlık</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">İçerik</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
};

export default AdminBlogFormPage;
