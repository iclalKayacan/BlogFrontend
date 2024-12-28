import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaSave, FaTimes } from "react-icons/fa";

const AdminBlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    summary: "",
    imageUrl: "",
    categoryIds: [],
    tagIds: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7079/api/Blogs/${id}`
      );
      const blog = response.data;
      setFormData({
        title: blog.title,
        content: blog.content,
        author: blog.author,
        summary: blog.summary || "",
        imageUrl: blog.imageUrl || "",
        categoryIds: blog.categories?.map((c) => c.id) || [],
        tagIds: blog.tags?.map((t) => t.id) || [],
      });
    } catch (error) {
      console.error("Blog yükleme hatası:", error);
      setError("Blog yüklenirken bir hata oluştu");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://localhost:7079/api/Category");
      setCategories(response.data);
    } catch (error) {
      console.error("Kategori yükleme hatası:", error);
      setError("Kategoriler yüklenirken bir hata oluştu");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setFormData((prev) => ({
      ...prev,
      categoryIds: selectedOptions,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (id) {
        await axios.put(`https://localhost:7079/api/Blogs/${id}`, formData);
        console.log("Blog başarıyla güncellendi");
      } else {
        await axios.post("https://localhost:7079/api/Blogs", formData);
        console.log("Blog başarıyla eklendi");
      }
      navigate("/admin/blogs");
    } catch (error) {
      console.error(
        "Blog işlemi hatası:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.message || "Blog işlemi sırasında bir hata oluştu"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
        {id ? "Blog Düzenle" : "Yeni Blog Ekle"}
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Başlık
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 
                     border border-gray-200 dark:border-gray-700 focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Yazar
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 
                     border border-gray-200 dark:border-gray-700 focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            İçerik
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="6"
            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 
                     border border-gray-200 dark:border-gray-700 focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Özet
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 
                     border border-gray-200 dark:border-gray-700 focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Resim URL
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 
                     border border-gray-200 dark:border-gray-700 focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Kategoriler
          </label>
          <select
            multiple
            name="categoryIds"
            value={formData.categoryIds}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 
                     border border-gray-200 dark:border-gray-700 focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent min-h-[120px]"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">
            Birden fazla kategori seçmek için Ctrl/Cmd tuşunu basılı tutun
          </p>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/blogs")}
            className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 
                     dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 
                     dark:text-gray-200 flex items-center gap-2"
          >
            <FaTimes />
            İptal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 
                     hover:from-blue-600 hover:to-indigo-700 text-white 
                     flex items-center gap-2 disabled:opacity-50"
          >
            <FaSave />
            {loading ? "Kaydediliyor..." : id ? "Güncelle" : "Kaydet"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminBlogForm;
