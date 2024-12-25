import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const AdminBlogEdit = ({ blog, onUpdate }) => {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [status, setStatus] = useState(blog.status);
  const [imageUrl, setImageUrl] = useState(blog.imageUrl || "");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const response = await axios.post(
        "https://localhost:7079/api/Image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUrl(response.data.url);
    } catch (error) {
      console.error("Resim yükleme hatası:", error);
      alert("Resim yüklenirken bir hata oluştu");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBlog = { ...blog, title, content, status, imageUrl };
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

      {/* Resim Yükleme */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-textDark mb-2">
          Blog Görseli
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-inputGray 
                     rounded-md shadow-sm text-sm font-medium text-textDark bg-white 
                     hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                     focus:ring-primary transition-colors"
          >
            {uploading ? "Yükleniyor..." : "Resim Seç"}
          </label>
          {imageUrl && (
            <div className="relative">
              <img
                src={imageUrl}
                alt="Blog görseli"
                className="h-20 w-20 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 
                         hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-red-500 transition-colors"
              >
                ×
              </button>
            </div>
          )}
        </div>
        {!imageUrl && (
          <p className="text-sm text-gray-500 mt-2">
            Henüz bir görsel seçilmedi
          </p>
        )}
      </div>

      {/* ReactQuill Editör */}
      <div className="mb-4">
        <ReactQuill
          value={content}
          onChange={setContent}
          style={{ height: "200px", color: "#333" }}
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
        <option value="taslak" className="text-gray-400">
          Taslak
        </option>
        <option value="yayınlanmış" className="text-green-500">
          Yayınlanmış
        </option>
      </select>

      {/* Güncelle Butonu */}
      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
          disabled={uploading}
        >
          {uploading ? "Resim Yükleniyor..." : "Güncelle"}
        </button>

        {imageUrl && (
          <button
            type="button"
            onClick={() => setImageUrl("")}
            className="text-red-500 hover:text-red-700 px-4 py-2 rounded-lg transition"
          >
            Resmi Kaldır
          </button>
        )}
      </div>
    </form>
  );
};

export default AdminBlogEdit;
