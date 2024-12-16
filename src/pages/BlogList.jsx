import React, { useState } from "react";
import BlogCard from "../components/BlogCard";

const BlogList = () => {
  const [blogs] = useState([
    {
      id: 1,
      title: "React ile Blog Yönetimi",
      summary: "React kullanarak bir blog yönetim sistemi nasıl oluşturulur?",
      image: "https://via.placeholder.com/300x200",
      category: "React",
    },
    {
      id: 2,
      title: "JavaScript'in Temelleri",
      summary: "JavaScript'e yeni başlayanlar için temel bilgiler.",
      image: "https://via.placeholder.com/300x200",
      category: "JavaScript",
    },
    {
      id: 3,
      title: "CSS ile Tasarım İpuçları",
      summary: "Modern web tasarımı için CSS ipuçları ve teknikler.",
      image: "https://via.placeholder.com/300x200",
      category: "CSS",
    },
    {
      id: 4,
      title: "Yapay Zeka ile Teknoloji Dünyası",
      summary: "Yapay zeka teknolojilerinin geleceği nasıl şekillendirecek?",
      image: "https://via.placeholder.com/300x200",
      category: "Teknoloji",
    },
    {
      id: 5,
      title: "Sağlıklı Yaşam İpuçları",
      summary: "Daha sağlıklı bir yaşam için günlük ipuçları ve öneriler.",
      image: "https://via.placeholder.com/300x200",
      category: "Sağlık",
    },
    {
      id: 6,
      title: "En Lezzetli Yemek Tarifleri",
      summary: "Evde kolayca yapabileceğiniz yemek tarifleri.",
      image: "https://via.placeholder.com/300x200",
      category: "Yemek Tarifleri",
    },
  ]);

  const [categories] = useState([
    "Tümü",
    "React",
    "JavaScript",
    "CSS",
    "Teknoloji",
    "Sağlık",
    "Yemek Tarifleri",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  // Filtrelenmiş bloglar
  const filteredBlogs =
    selectedCategory === "Tümü"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex">
      {/* Sol Tarafta Kategoriler */}
      <div className="w-1/4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Kategoriler
        </h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => handleCategoryChange(category)}
                className={`w-full text-left px-4 py-2 rounded ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Sağ Tarafta Blog Kartları */}
      <div className="w-3/4 ml-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <p className="text-gray-600 dark:text-gray-400 col-span-full text-center">
            Bu kategoriye ait blog bulunamadı.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
