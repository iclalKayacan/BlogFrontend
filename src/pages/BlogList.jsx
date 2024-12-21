import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BlogCard from "../components/BlogCard";
import CategoryList from "../components/CategoryList";
import axiosInstance from "../api/axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const blogsPerPage = 6; // Sayfa başına gösterilecek blog sayısı

  const { status: categoryStatus } = useSelector((state) => state.categories);

  // Blogları kategoriye göre API'den alma
  useEffect(() => {
    const fetchBlogsByCategory = async () => {
      setLoading(true);
      try {
        let response;
        if (selectedCategory === "Tümü") {
          response = await axiosInstance.get("/Blogs"); // Tüm blogları çek
        } else {
          response = await axiosInstance.get(
            `/Category/${selectedCategory}/blogs`
          ); // Seçilen kategoriye göre blogları çek
        }
        setBlogs(response.data);
        setDisplayedBlogs(response.data.slice(0, blogsPerPage));
        setCurrentPage(1);
        setLoading(false);
      } catch (error) {
        console.error("API'den veri alınırken hata:", error);
        setBlogs([]);
        setDisplayedBlogs([]);
        setLoading(false);
      }
    };

    fetchBlogsByCategory();
  }, [selectedCategory]);

  // Sonsuz kaydırma işlevi
  const loadMoreBlogs = () => {
    if (loading) return;

    const nextPage = currentPage + 1;
    const startIndex = currentPage * blogsPerPage;
    const newBlogs = blogs.slice(startIndex, nextPage * blogsPerPage);

    if (newBlogs.length > 0) {
      setDisplayedBlogs((prev) => [...prev, ...newBlogs]);
      setCurrentPage(nextPage);
    }
  };

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
  }, [currentPage, blogs, loading]);

  if (categoryStatus === "loading") {
    return <p>Kategoriler yükleniyor...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 flex max-w-7xl">
      {/* Kategoriler */}
      <div className="w-1/4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Kategoriler
        </h2>
        <CategoryList
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Blog Kartları */}
      <div className="w-3/4 ml-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && displayedBlogs.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 w-full text-center">
              Bloglar yükleniyor...
            </p>
          ) : displayedBlogs.length > 0 ? (
            displayedBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <p className="text-gray-600 dark:text-gray-400 w-full text-center">
              Seçilen kategori için blog bulunamadı.
            </p>
          )}
        </div>
        {loading && displayedBlogs.length > 0 && (
          <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
            Daha fazla blog yükleniyor...
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
