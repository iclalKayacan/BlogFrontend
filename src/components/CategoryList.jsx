import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/categoriesSlice";

const CategoryList = ({ selectedCategory, onSelectCategory }) => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.categories
  );

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
      {categories.map((category) => (
        <li key={category.id}>
          <button
            onClick={() => onSelectCategory(category.id)}
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
