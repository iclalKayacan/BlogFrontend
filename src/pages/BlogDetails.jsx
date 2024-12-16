import React from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();

  // Statik içerik (id'ye göre farklı içerikler)
  const blogData = {
    1: {
      title: "The AI magically removes moving objects from videos.",
      content:
        "This AI technology instantly removes moving objects from your videos, giving them a clean and professional look. It works seamlessly to detect and process videos in real-time, enhancing your editing workflow.",
      image: "https://via.placeholder.com/1200x600",
      category: "Nature",
      author: "Carrol Atkinson",
      date: "February 10, 2019",
      readTime: "5 min read",
    },
  };

  const blog = blogData[id];

  if (!blog) {
    return <p>Blog bulunamadı!</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Resim Alanı */}
      <div className="relative w-full">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[450px] md:h-[600px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
          {/* Kategori */}
          <span className="text-xs md:text-sm px-3 py-1 bg-green-500 text-white rounded-full mb-4">
            {blog.category}
          </span>
          {/* Başlık */}
          <h1 className="text-3xl md:text-5xl font-bold text-white px-4 mb-4">
            {blog.title}
          </h1>
          {/* Yazar ve Tarih */}
          <div className="text-gray-300 text-sm flex space-x-4">
            <p>
              By <span className="font-semibold">{blog.author}</span>
            </p>
            <p>{blog.date}</p>
            <p>{blog.readTime}</p>
          </div>
        </div>
      </div>

      {/* Blog İçeriği */}
      <div className="max-w-4xl mx-auto p-8 leading-relaxed text-gray-700 dark:text-gray-300">
        <p className="mb-6">{blog.content}</p>
        <p>
          With advanced AI models and neural networks, removing objects in
          videos has never been easier. Whether you are a professional editor or
          a casual user, this technology simplifies video cleanup in a single
          click.
        </p>
      </div>

      {/* Yazar Bilgisi */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Carrol Atkinson
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tech Enthusiast & AI Expert
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
