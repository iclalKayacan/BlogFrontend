import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      {/* Blog Görseli */}
      <div className="w-full h-48 bg-gray-300">
        <img
          src={blog.image || "https://via.placeholder.com/300x200"}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        {/* Kategori Badge */}
        {blog.categories && (
          <div className="mb-2 flex flex-wrap gap-2">
            {blog.categories.map((category, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded-full text-sm font-semibold text-white ${
                  category.name === "React"
                    ? "bg-blue-500"
                    : category.name === "JavaScript"
                    ? "bg-yellow-500"
                    : category.name === "CSS"
                    ? "bg-blue-300"
                    : "bg-gray-500"
                }`}
              >
                {category.name}
              </span>
            ))}
          </div>
        )}

        {/* Blog Başlığı */}
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          {blog.title}
        </h2>

        {/* Blog Özeti */}
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
          {blog.summary}
        </p>

        {/* Devamını Oku Linki */}
        <Link
          to={`/blogs/${blog.id}`}
          className="text-primary hover:underline mt-4 inline-block"
        >
          Devamını Oku
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
