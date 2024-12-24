import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogCard from "../components/BlogCard";
import { fetchBlogs } from "../store/blogsSlice";

const BlogList = () => {
  const dispatch = useDispatch();
  const { items: blogs, loading, error } = useSelector((state) => state.blogs);

  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6; // Sayfa başına gösterilecek blog sayısı

  useEffect(() => {
    dispatch(fetchBlogs()); // Tüm blogları çek
  }, [dispatch]);

  useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * blogsPerPage;
    setDisplayedBlogs(blogs.slice(startIndex, endIndex));
  }, [blogs, currentPage]);

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

  if (loading && displayedBlogs.length === 0) {
    return <p>Bloglar yükleniyor...</p>;
  }

  if (error) {
    return <p>Bir hata oluştu: {error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 flex max-w-7xl">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedBlogs.length > 0 ? (
            displayedBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <p className="text-gray-600 dark:text-gray-400 w-full text-center">
              Blog bulunamadı.
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
