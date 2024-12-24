import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogCard from "../components/BlogCard";
import CategorySidebar from "../components/CategorySidebar";
import { fetchBlogs } from "../store/blogsSlice";
import axios from "axios";

const BlogList = () => {
  const dispatch = useDispatch();
  const { items: blogs, loading, error } = useSelector((state) => state.blogs);
  const { selectedCategory } = useSelector((state) => state.categories);

  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Kategori değiştiğinde veya sayfa yüklendiğinde blogları getir
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedCategory) {
          console.log(
            "Seçili kategori için bloglar getiriliyor:",
            selectedCategory
          );
          const response = await axios.get(
            `https://localhost:7079/api/Category/${selectedCategory}/blogs`
          );
          const blogs = response.data.$values || response.data;
          setDisplayedBlogs(blogs);
        } else {
          console.log("Tüm bloglar getiriliyor");
          dispatch(fetchBlogs());
        }
      } catch (error) {
        console.error("Blog yükleme hatası:", error);
      }
    };

    fetchData();
    // Kategori değiştiğinde sayfa numarasını sıfırla
    setCurrentPage(1);
  }, [dispatch, selectedCategory]);

  // Görüntülenecek blogları ayarla
  useEffect(() => {
    if (!selectedCategory) {
      const startIndex = 0;
      const endIndex = currentPage * blogsPerPage;
      setDisplayedBlogs(blogs.slice(startIndex, endIndex));
    }
  }, [blogs, currentPage, selectedCategory]);

  // Sonsuz scroll için daha fazla blog yükle
  const loadMoreBlogs = () => {
    if (loading) return;
    setCurrentPage((prev) => prev + 1);
  };

  // Scroll event listener
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
  }, [currentPage, loading]);

  // Loading durumu
  if (loading && displayedBlogs.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 flex max-w-7xl">
        <div className="w-3/4 pr-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg"></div>
                <div className="space-y-3 mt-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/4">
          <CategorySidebar />
        </div>
      </div>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex max-w-7xl">
        <div className="w-3/4 pr-8">
          <div className="text-red-500 text-center p-4">
            Bir hata oluştu: {error}
          </div>
        </div>
        <div className="w-1/4">
          <CategorySidebar />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 max-w-7xl">
      {/* Sol sidebar - Kategoriler */}
      <div className="w-full md:w-1/4 md:sticky md:top-4 h-fit">
        <CategorySidebar />
      </div>

      {/* Ana içerik - Blog listesi */}
      <div className="w-full md:w-3/4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedBlogs.length > 0 ? (
            displayedBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <p className="text-gray-600 dark:text-gray-400 col-span-full text-center">
              {selectedCategory
                ? "Bu kategoride blog bulunamadı."
                : "Blog bulunamadı."}
            </p>
          )}
        </div>
        {loading && displayedBlogs.length > 0 && (
          <div className="text-center mt-6">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Daha fazla blog yükleniyor...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
