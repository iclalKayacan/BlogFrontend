import React from "react";
import CategoryBadge from "./CategoryBadge";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden flex flex-col h-[400px]">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow justify-between">
        {/* İçerik */}
        <div>
          {/* Kategori Badge */}
          <CategoryBadge category={blog.category} />

          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-2">
            {blog.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
            {blog.summary}
          </p>
        </div>
        {/* Devamını Oku */}
        <a
          href={`/blogs/${blog.id}`}
          className="text-primary hover:underline mt-2"
        >
          Devamını Oku
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
