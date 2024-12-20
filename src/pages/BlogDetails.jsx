import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById } from "../store/blogsSlice";
import Comments from "../components/Comments";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Redux'tan blog verilerini ve durumunu al
  const { blog, status, error } = useSelector((state) => state.blogs);

  // Blog verisini API'den çek
  useEffect(() => {
    dispatch(fetchBlogById(id));
  }, [dispatch, id]);

  // Yükleme ve hata durumları
  if (status === "loading") {
    return <p>Yükleniyor...</p>;
  }

  if (status === "failed") {
    return <p>Hata: {error}</p>;
  }

  if (!blog) {
    return <p>Blog bulunamadı!</p>;
  }

  // Dinamik verilerle mevcut tasarımınızı koruyarak işleme devam ediyoruz
  return (
    <div className="bg-backgroundLight dark:bg-backgroundDark">
      {/* Üst Görsel */}
      <div className="relative w-full">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[450px] md:h-[600px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
          <span className="text-xs md:text-sm px-3 py-1 bg-secondary text-white rounded-full mb-4">
            {blog.categories.map((cat) => cat.name).join(", ")}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white px-4 mb-4">
            {blog.title}
          </h1>
          <div className="text-gray-300 text-sm flex space-x-4">
            <p>
              By <span className="font-semibold">{blog.author}</span>
            </p>
            <p>{blog.date}</p>
            <p>{blog.readTime}</p>
          </div>
        </div>
      </div>

      {/* Alt İçerik */}
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row gap-8 py-8 px-4">
        {/* Sol: Blog İçeriği */}
        <article className="md:w-2/3 leading-relaxed text-gray-700 dark:text-textLight">
          {blog.content.split("\n").map((paragraph, index) => (
            <React.Fragment key={index}>
              <p className="mb-4">{paragraph}</p>
            </React.Fragment>
          ))}
          <Comments comments={blog.comments} />
        </article>

        {/* Sağ: Yazar Bilgisi */}
        <aside className="md:w-1/3">
          <div className="dark:bg-gray-800 p-6 text-center rounded-lg shadow-md">
            <img
              src={blog.authorImage}
              alt={blog.author}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-textDark dark:text-textLight">
              {blog.author}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {blog.aboutAuthor}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetails;
