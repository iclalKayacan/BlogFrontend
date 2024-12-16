import React from "react";

const categoryColors = {
  React: "bg-categories-react",
  JavaScript: "bg-categories-javascript",
  CSS: "bg-categories-css",
  Teknoloji: "bg-categories-teknoloji",
  Sağlık: "bg-categories-sağlık",
  "Yemek Tarifleri": "bg-categories-yemek",
};

const CategoryBadge = ({ category }) => {
  const colorClass = categoryColors[category] || "bg-categories-default";

  return (
    <span
      className={`inline-block ${colorClass} text-white text-sm font-semibold px-3 py-1 rounded-full`}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;
