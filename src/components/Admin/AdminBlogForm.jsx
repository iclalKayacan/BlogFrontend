import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createBlog } from "../../store/blogsSlice";
import { fetchCategories } from "../../store/categoriesSlice";
import axios from "axios";

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
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const blogData = {
        title: title,
        content: content,
        author: author,
        status: blogStatus,
        categoryIds: selectedCategories.map((id) => parseInt(id)),
        imageUrl: coverImage,
      };

      console.log("Gönderilen veri:", blogData); // Debug için

      const response = await axios.post(
        "https://localhost:7079/api/Blogs",
        blogData
      );

      if (response.data) {
        console.log("Blog başarıyla eklendi:", response.data);
        // Form başarılı mesajı
        alert("Blog başarıyla eklendi!");
        // Formu sıfırla
        setTitle("");
        setContent("");
        setAuthor("");
        setBlogStatus("taslak");
        setCoverImage("");
        setSelectedCategories([]);
      }
    } catch (error) {
      console.error("Blog ekleme hatası:", error.response?.data);
      setError(
        error.response?.data?.message || "Blog eklenirken bir hata oluştu"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      {/* Başlık */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Başlık
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md 
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-white 
            focus:ring-primary focus:border-primary"
          required
        />
      </div>

      {/* Kategori Seçimi */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
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
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-200">
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* İçerik */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          İçerik
        </label>
        <ReactQuill
          value={content}
          onChange={setContent}
          className="h-64 mb-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          theme="snow"
        />
      </div>

      {/* Yazar */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Yazar
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md 
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-white 
            focus:ring-primary focus:border-primary"
        />
      </div>

      {/* Durum */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Durum
        </label>
        <select
          value={blogStatus}
          onChange={(e) => setBlogStatus(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md 
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-white 
            focus:ring-primary focus:border-primary"
        >
          <option value="taslak">Taslak</option>
          <option value="yayında">Yayında</option>
        </select>
      </div>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white py-2 px-4 rounded-md 
          hover:bg-secondary transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Yükleniyor..." : "Blog Ekle"}
      </button>
    </form>
  );
};

export default AdminBlogForm;
