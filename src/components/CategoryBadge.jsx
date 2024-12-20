import React from "react";

const categoryColors = {
  React: "bg-blue-500",
  JavaScript: "bg-yellow-500",
  CSS: "bg-purple-500",
  Teknoloji: "bg-red-500",
  Sağlık: "bg-green-500",
  "Yemek Tarifleri": "bg-orange-500",
};

const CategoryBadge = ({ category }) => {
  const colorClass = categoryColors[category] || "bg-gray-500";

  return (
    <span
      className={`inline-block ${colorClass} text-white text-sm font-semibold px-3 py-1 rounded-full`}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;
