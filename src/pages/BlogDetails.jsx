import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById } from "../store/blogsSlice";
import CategoryBadge from "../components/CategoryBadge";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { fetchTags } from "../store/tagsSlice";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    currentBlog: blog,
    status,
    error,
  } = useSelector((state) => state.blogs);
  const { tags } = useSelector((state) => state.tags);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  if (status === "loading") {
    return <p>Yükleniyor...</p>;
  }

  if (status === "failed") {
    return <p>Hata: {error}</p>;
  }

  if (!blog) {
    return <p>Blog bulunamadı!</p>;
  }

  const categories = blog.categories?.$values || blog.categories || [];
  const comments = blog.comments?.$values || blog.comments || [];

  return (
    <div className="bg-backgroundLight dark:bg-backgroundDark">
      {/* Üst Görsel */}
      <div className="relative w-full">
        <img
          src={blog.image || "https://via.placeholder.com/1200x600"}
          alt={blog.title}
          className="w-full h-[450px] md:h-[600px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
          {/* Kategori Badges */}
          {categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <CategoryBadge
                  key={category.id}
                  category={category.name}
                  color={category.color}
                />
              ))}
            </div>
          )}

          <h1 className="text-3xl md:text-5xl font-bold text-white px-4 mb-4">
            {blog.title}
          </h1>
          <div className="text-gray-300 text-sm flex space-x-4">
            <p>
              By{" "}
              <span className="font-semibold">{blog.author || "Unknown"}</span>
            </p>
            <p className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6l4 2M12 4a8 8 0 100 16 8 8 0 000-16z"
                />
              </svg>
              <span>
                {blog.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString()
                  : "Tarih yok"}
              </span>
            </p>
            <p>{blog.readTime || "Okuma süresi yok"}</p>
          </div>
        </div>
      </div>

      {/* Alt İçerik */}
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row gap-8 py-8 px-4">
        {/* Sol: Blog İçeriği */}
        <article className="md:w-2/3 leading-relaxed text-gray-700 dark:text-textLight">
          {blog.content
            ? blog.content.split("\n").map((paragraph, index) => (
                <React.Fragment key={index}>
                  <p className="mb-4">{paragraph}</p>
                </React.Fragment>
              ))
            : "İçerik bulunamadı."}
        </article>

        {/* Sağ: Yazar Bilgisi */}
        <aside className="md:w-1/3">
          <div className="sticky top-4 space-y-6">
            {/* Yazar Kartı */}
            <div className="dark:bg-gray-800 bg-white p-6 text-center rounded-lg shadow-md">
              <img
                src={blog.authorImage || "https://via.placeholder.com/150"}
                alt={blog.author || "Yazar"}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-secondary"
              />
              <h3 className="text-xl font-semibold text-textDark dark:text-textLight mb-2">
                {blog.author || "Yazar Bilgisi Yok"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {blog.aboutAuthor || "Yazar hakkında bilgi bulunamadı."}
              </p>
            </div>

            {/* Etiketler Kartı */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="dark:bg-gray-800 bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-lg mb-4 text-gray-800 dark:text-white">
                  Etiketler
                </h4>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 
                               text-gray-700 dark:text-gray-300 rounded-full 
                               text-sm hover:bg-gray-200 dark:hover:bg-gray-600 
                               transition-colors cursor-pointer"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Yorumlar Bölümü */}
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Yorumlar ({comments.length})
        </h2>
        <CommentForm blogId={parseInt(id)} />
        <CommentList comments={comments} />
      </div>
    </div>
  );
};

export default BlogDetails;
