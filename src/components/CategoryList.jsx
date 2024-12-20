import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/categoriesSlice";

const CategoryList = ({ selectedCategory, onSelectCategory }) => {
  const dispatch = useDispatch();

  // Redux'tan kategorileri ve durumunu çekiyoruz
  const { categories, status, error } = useSelector(
    (state) => state.categories
  );

  // Kategorileri API'den çek
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <p>Kategoriler yükleniyor...</p>;
  }

  if (status === "failed") {
    return <p>Hata: {error}</p>;
  }

  return (
    <ul className="space-y-2">
      {/* "Tümü" Seçeneği */}
      <li>
        <button
          onClick={() => onSelectCategory("Tümü")}
          className={`w-full text-left px-4 py-2 rounded ${
            selectedCategory === "Tümü"
              ? "bg-primary text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
        >
          Tümü
        </button>
      </li>

      {/* Dinamik Kategoriler */}
      {categories.map((category) => (
        <li key={category.id}>
          <button
            onClick={() => onSelectCategory(category.id)} // category.id gönderiliyor
            className={`w-full text-left px-4 py-2 rounded ${
              selectedCategory === category.id
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
