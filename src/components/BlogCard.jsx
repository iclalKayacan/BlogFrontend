import React from "react";
import { Link } from "react-router-dom";
import CategoryBadge from "./CategoryBadge";

const BlogCard = ({ blog }) => {
  // Kategorileri işle
  let categories = [];

  if (blog.categories && blog.categories.$values) {
    categories = blog.categories.$values;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden h-full flex flex-col">
      {/* Blog Görseli */}
      <div className="w-full h-48 bg-gray-300">
        <img
          src={blog.image || "https://via.placeholder.com/300x200"}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Kart İçeriği */}
      <div className="p-4 flex flex-col flex-1">
        {/* Kategori Badge */}
        {categories.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {categories.map((category) => (
              <CategoryBadge
                key={category.id}
                category={category.name}
                color={category.color} // API'den gelen rengi kullan
              />
            ))}
          </div>
        )}

        {/* Blog Başlığı */}
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          {blog.title}
        </h2>

        {/* Blog Özeti */}
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm flex-1">
          {blog.summary}
        </p>

        {/* Devamını Oku Linki */}
        <div className="mt-auto pt-4">
          <Link
            to={`/blogs/${blog.id}`}
            className="text-primary hover:underline inline-block"
          >
            Devamını Oku
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
