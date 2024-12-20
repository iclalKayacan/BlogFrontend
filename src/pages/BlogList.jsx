import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BlogCard from "../components/BlogCard";
import CategoryList from "../components/CategoryList";
import axiosInstance from "../api/axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const blogsPerPage = 6;

  const { status: categoryStatus } = useSelector((state) => state.categories);

  // Blogları API'den alma
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/Blogs");
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("API'den veri alınırken hata:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filtreleme işlemi
  const filteredBlogs =
    selectedCategory === "Tümü"
      ? blogs
      : blogs.filter((blog) =>
          blog.categories.some(
            (category) => String(category.id) === String(selectedCategory)
          )
        );

  const totalBlogs = filteredBlogs.length;

  // Debugging için konsola yazdırma (Bu kısım!)
  console.log("Bloglar:", blogs);
  console.log("Seçilen Kategori:", selectedCategory);
  console.log("Filtrelenmiş Bloglar:", filteredBlogs);

  // Filtrelenmiş blogları sayfalamaya göre ayarlama
  useEffect(() => {
    setLoading(true);
    const initialBlogs = filteredBlogs.slice(0, blogsPerPage);
    setDisplayedBlogs(initialBlogs);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    setCurrentPage(1);
  }, [filteredBlogs]);

  // Daha fazla blog yükleme
  const loadMoreBlogs = () => {
    if (displayedBlogs.length >= totalBlogs) return;

    const nextPage = currentPage + 1;
    const newBlogs = filteredBlogs.slice(0, nextPage * blogsPerPage);
    setDisplayedBlogs(newBlogs);
    setCurrentPage(nextPage);
  };

  // Scroll olayını yakalama
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

  if (categoryStatus === "loading") {
    return <p>Kategoriler yükleniyor...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 flex max-w-7xl">
      <div className="w-1/4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Kategoriler
        </h2>
        <CategoryList
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>
      <div className="w-3/4 ml-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
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
        {displayedBlogs.length < totalBlogs && (
          <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
            Daha fazla blog yükleniyor...
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
