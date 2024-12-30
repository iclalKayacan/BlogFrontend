import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter } from "react-icons/fa";

const AdminBlogList = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("https://localhost:7079/api/Blogs");
      setBlogs(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Blog yükleme hatası:", error);
      setError("Bloglar yüklenirken bir hata oluştu");
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://localhost:7079/api/Category");
      console.log("Kategoriler:", response.data);
      setCategories(response.data);
    } catch (error) {
      console.error("Kategori yükleme hatası:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu blogu silmek istediğinize emin misiniz?")) {
      try {
        await axios.delete(`https://localhost:7079/api/Blogs/${id}`);
        setBlogs(blogs.filter((blog) => blog.id !== id));
      } catch (error) {
        console.error("Blog silme hatası:", error);
        alert("Blog silinirken bir hata oluştu");
      }
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" ||
      blog.categories?.some((cat) => cat.id.toString() === categoryFilter);
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-16 bg-gray-100 dark:bg-gray-800 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Üst Başlık ve Yeni Blog Butonu */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Blog Yönetimi
        </h1>
        <button
          onClick={() => navigate("/admin/blogs/new")}
          className="bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2 transform transition hover:scale-105 shadow-lg"
        >
          <FaPlus />
          <span>Yeni Blog</span>
        </button>
      </div>

      {/* Filtreleme Araçları */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <div className="relative w-64">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Blog ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 
                     border border-gray-200 dark:border-gray-700 focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 
                   border border-gray-200 dark:border-gray-700 focus:ring-2 
                   focus:ring-blue-500 cursor-pointer"
        >
          <option value="all">Tüm Kategoriler</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Blog Listesi */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800 text-left">
              <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Başlık
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Yazar
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Tarih
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                    {blog.title}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                    {blog.author}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                    {blog.categories && blog.categories.length > 0
                      ? blog.categories.map((cat) => cat.name).join(", ")
                      : "Kategori Yok"}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)}
                        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 
                       dark:hover:text-blue-300 transition-colors"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 
                       dark:hover:text-red-300 transition-colors"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  Blog bulunamadı
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlogList;
