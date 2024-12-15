import React, { useState } from "react";

const BlogList = () => {
  const [blogs] = useState([
    {
      id: 1,
      title: "React ile Blog Yönetimi",
      summary: "React kullanarak bir blog yönetim sistemi nasıl oluşturulur?",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      title: "JavaScript'in Temelleri",
      summary: "JavaScript'e yeni başlayanlar için temel bilgiler.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      title: "CSS ile Tasarım İpuçları",
      summary: "Modern web tasarımı için CSS ipuçları ve teknikler.",
      image: "https://via.placeholder.com/300x200",
    },
  ]);

  const [categories] = useState(["Tümü", "React", "JavaScript", "CSS"]);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  const filteredBlogs =
    selectedCategory === "Tümü"
      ? blogs
      : blogs.filter((blog) => blog.title.includes(selectedCategory));

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
          Bloglar
        </h1>
        <div className="flex space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {blog.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {blog.summary}
              </p>
              <a
                href={`/blogs/${blog.id}`}
                className="text-primary hover:underline mt-4 inline-block"
              >
                Devamını Oku
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
