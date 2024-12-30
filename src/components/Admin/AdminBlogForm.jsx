import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaSave, FaTimes } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AdminBlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Kategori ve Etiket listelerini tutmak için state'ler
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // Form verisi
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    summary: "",
    imageUrl: "",
    categoryIds: [],
    tagIds: [],
  });

  // Resim seçimi için ekstra state
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Bileşen ilk yüklendiğinde veya "id" değiştiğinde
  useEffect(() => {
    fetchCategories();
    fetchTags();
    if (id) {
      fetchBlog();
    }
  }, [id]);

  // 1) Kategorileri çek
  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://localhost:7079/api/Category");
      setCategories(response.data);
    } catch (error) {
      console.error("Kategori yükleme hatası:", error);
      setError("Kategoriler yüklenirken bir hata oluştu");
    }
  };

  // 2) Etiketleri çek
  const fetchTags = async () => {
    try {
      const response = await axios.get("https://localhost:7079/api/Tags");
      setTags(response.data);
    } catch (error) {
      console.error("Etiket yükleme hatası:", error);
      setError("Etiketler yüklenirken bir hata oluştu");
    }
  };

  // 3) Varolan blogu düzenleme modunda (id varsa) sunucudan çek
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

  // Form input değişimi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ReactQuill için ayrı handle
  const handleContentChange = (value) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  // Kategori seçimi
  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setFormData((prev) => ({ ...prev, categoryIds: selectedOptions }));
  };

  // Etiket seçimi
  const handleTagChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setFormData((prev) => ({ ...prev, tagIds: selectedOptions }));
  };

  // 4) Dosya seçilince state'e kaydet
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0] || null);
  };

  // 5) "Sunucuya Yükle" butonuna basınca
  const handleUploadImage = async () => {
    if (!selectedFile) {
      alert("Lütfen bir resim seçin.");
      return;
    }
    try {
      // Örneğin, AdminBlogForm içinde:
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "https://localhost:7079/api/Image/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data.url); // Dönen tam URL

      // Sunucunun döndürdüğü { url: "/uploads/xxx.jpg" }
      const uploadedUrl = response.data.url;
      console.log("Yüklenen resmin URL'si:", uploadedUrl);

      // Blog formuna imageUrl olarak koy
      setFormData((prev) => ({ ...prev, imageUrl: uploadedUrl }));
      alert("Resim başarıyla yüklendi, form alanına eklendi.");
    } catch (error) {
      console.error("Resim yükleme hatası:", error);
      alert("Resim yükleme sırasında bir hata oluştu.");
    }
  };

  // 6) Blog kaydet/güncelle
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (id) {
        // Mevcut blogu güncelle
        await axios.put(`https://localhost:7079/api/Blogs/${id}`, formData);
        console.log("Blog başarıyla güncellendi");
      } else {
        // Yeni blog ekle
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
        {/* Başlık */}
        <div>
          <label className="block text-sm font-medium mb-1">Başlık</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-200 
                       focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Yazar */}
        <div>
          <label className="block text-sm font-medium mb-1">Yazar</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-200 
                       focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* İçerik (React Quill) */}
        <div>
          <label className="block text-sm font-medium mb-1">İçerik</label>
          <ReactQuill
            value={formData.content}
            onChange={handleContentChange}
            className="h-96"
          />
        </div>

        {/* Özet */}
        <div>
          <label className="block text-sm font-medium mb-1">Özet</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 
                       focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/*  Resim Yükleme */}
        <div>
          <label className="block text-sm font-medium mb-1">Resim Yükle</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 
                       file:mr-4 file:py-2 file:px-4 
                       file:rounded-full file:border-0 
                       file:text-sm file:font-semibold 
                       file:bg-primary file:text-white 
                       hover:file:bg-blue-600"
          />
          <button
            type="button"
            onClick={handleUploadImage}
            className="mt-2 px-4 py-2 bg-primary text-white rounded-lg"
          >
            Sunucuya Yükle
          </button>
        </div>

        {/* Resim URL */}
        <div>
          <label className="block text-sm font-medium mb-1">Resim URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            readOnly
            className="w-full px-4 py-2 rounded-lg border border-gray-200 
                       focus:ring-2 focus:ring-blue-500 bg-gray-100"
          />
        </div>

        {/* Kategoriler */}
        <div>
          <label className="block text-sm font-medium mb-1">Kategoriler</label>
          <select
            multiple
            name="categoryIds"
            value={formData.categoryIds}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 
                       focus:ring-2 focus:ring-blue-500 min-h-[120px]"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">
            Birden fazla kategori seçmek için Ctrl/Cmd tuşuna basılı tutun
          </p>
        </div>

        {/* Etiketler */}
        <div>
          <label className="block text-sm font-medium mb-1">Etiketler</label>
          <select
            multiple
            name="tagIds"
            value={formData.tagIds}
            onChange={handleTagChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 
                       focus:ring-2 focus:ring-blue-500 min-h-[120px]"
          >
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">
            Birden fazla etiket seçmek için Ctrl/Cmd tuşuna basılı tutun
          </p>
        </div>

        {/* Butonlar */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/blogs")}
            className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center gap-2"
          >
            <FaTimes />
            İptal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-primary text-white flex items-center gap-2 disabled:opacity-50"
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
