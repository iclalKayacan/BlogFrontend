import React from "react";

const CategoryBadge = ({ category }) => {
  // Kategori renklerini tanımlayalım
  const categoryColors = {
    Technology: "bg-blue-500",
    Design: "bg-purple-500",
    Business: "bg-green-500",
    Marketing: "bg-yellow-500",
    Development: "bg-red-500",
    Lifestyle: "bg-pink-500",
    // Diğer kategoriler için renkler ekleyebilirsiniz
  };

  // Kategori adına göre renk seç veya varsayılan rengi kullan
  const colorClass = categoryColors[category] || "bg-gray-500";

  return (
    <span
      className={`inline-block ${colorClass} text-white text-sm font-semibold px-3 py-1 rounded-full hover:opacity-90 transition-opacity`}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;
