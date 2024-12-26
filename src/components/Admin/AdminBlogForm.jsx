import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createBlog } from "../../store/blogsSlice";
import { fetchCategories } from "../../store/categoriesSlice";

const AdminBlogForm = () => {
  const dispatch = useDispatch();
  const { items: categories } = useSelector((state) => state.categories);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [blogStatus, setBlogStatus] = useState("taslak");
  const [coverImage, setCoverImage] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title.trim() || !content.trim()) {
        alert("Başlık ve içerik alanları zorunludur!");
        return;
      }

      const blogData = {
        title: title.trim(),
        content: content.trim(),
        author: author.trim() || "Anonim",
        coverImage: coverImage,
        status: blogStatus,
        categoryIds: selectedCategories.map((id) => parseInt(id)),
      };

      const resultAction = await dispatch(createBlog(blogData));

      if (createBlog.fulfilled.match(resultAction)) {
        alert("Blog başarıyla eklendi!");
        setTitle("");
        setContent("");
        setAuthor("");
        setBlogStatus("taslak");
        setCoverImage("");
        setSelectedCategories([]);
      } else {
        throw new Error(resultAction.payload);
      }
    } catch (err) {
      alert(err.message || "Blog eklenirken bir hata oluştu");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      {/* Mevcut form alanları */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Başlık
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          required
        />
      </div>

      {/* Kategori Seçimi */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kategoriler
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <label key={category.id} className="inline-flex items-center">
              <input
                type="checkbox"
                value={category.id}
                checked={selectedCategories.includes(category.id.toString())}
                onChange={(e) => {
                  const categoryId = e.target.value;
                  setSelectedCategories((prev) =>
                    e.target.checked
                      ? [...prev, categoryId]
                      : prev.filter((id) => id !== categoryId)
                  );
                }}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="ml-2 text-sm text-gray-700">
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Diğer form alanları */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          İçerik
        </label>
        <ReactQuill
          value={content}
          onChange={setContent}
          className="h-64 mb-12"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Yazar
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Durum
        </label>
        <select
          value={blogStatus}
          onChange={(e) => setBlogStatus(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
        >
          <option value="taslak">Taslak</option>
          <option value="yayında">Yayında</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors disabled:opacity-50"
      >
        {uploading ? "Yükleniyor..." : "Blog Ekle"}
      </button>
    </form>
  );
};

export default AdminBlogForm;
