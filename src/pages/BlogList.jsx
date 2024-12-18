import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";

const BlogList = () => {
  const blogs = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Blog Başlık ${i + 1}`,
    summary: `Blog Özeti ${i + 1}`,
    image: `/assets/${
      [
        "book.jpg",
        "beach.jpg",
        "cake.jpg",
        "hakkimizda.jpg",
        "makyaj.jpg",
        "movie.jpg",
      ][i % 6]
    }`, // URL kullanımı
    category: [
      "React",
      "JavaScript",
      "CSS",
      "Teknoloji",
      "Sağlık",
      "Yemek Tarifleri",
    ][i % 6],
  }));

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
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Yeni loading state
  const blogsPerPage = 6;

  // Filtrelenmiş kategoriler
  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBlogs =
    selectedCategory === "Tümü"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  const totalBlogs = filteredBlogs.length;

  useEffect(() => {
    setLoading(true); // Yükleme başlıyor
    const initialBlogs = blogs
      .filter((blog) =>
        selectedCategory === "Tümü" ? true : blog.category === selectedCategory
      )
      .slice(0, blogsPerPage);

    setTimeout(() => {
      setDisplayedBlogs(initialBlogs);
      setLoading(false); // Yükleme tamamlandı
    }, 500); // 0.5 saniye gecikme (opsiyonel)
    setCurrentPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200
      ) {
        loadMoreBlogs();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, displayedBlogs]);

  const loadMoreBlogs = () => {
    if (displayedBlogs.length >= totalBlogs) return;

    const nextPage = currentPage + 1;
    const newBlogs = filteredBlogs.slice(0, nextPage * blogsPerPage);
    setDisplayedBlogs(newBlogs);
    setCurrentPage(nextPage);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setDisplayedBlogs([]);
    setLoading(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex max-w-7xl">
      {/* Sol Tarafta Kategoriler */}
      <div className="w-1/4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Kategoriler
        </h2>

        {/* Kategori Arama */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Kategori Ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring focus:ring-primary dark:bg-gray-700 dark:text-gray-200"
          />
        </div>

        <ul className="space-y-2">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
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
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Kategori bulunamadı.
            </p>
          )}
        </ul>
      </div>

      {/* Sağ Tarafta Blog Kartları */}
      <div className="w-3/4 ml-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-gray-600 dark:text-gray-400 w-full text-center">
              Bloglar yükleniyor...
            </p>
          ) : filteredCategories.length > 0 ? (
            displayedBlogs.length > 0 ? (
              displayedBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400 w-full text-center">
                Seçilen kategori için blog bulunamadı.
              </p>
            )
          ) : null}
        </div>

        {/* Blogları Yükleme */}
        {filteredCategories.length > 0 &&
          displayedBlogs.length < totalBlogs && (
            <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
              Daha fazla blog yükleniyor...
            </p>
          )}
      </div>
    </div>
  );
};

export default BlogList;
