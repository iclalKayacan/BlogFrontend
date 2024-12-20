import React from "react";

const CategoryBadge = ({ category, color }) => {
  const colorClass = color || "bg-gray-500"; // Varsayılan renk

  return (
    <span
      className={`inline-block ${colorClass} text-white text-sm font-semibold px-3 py-1 rounded-full`}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;
