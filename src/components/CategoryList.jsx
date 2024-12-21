import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/categoriesSlice";

const CategoryList = ({ selectedCategory, onSelectCategory }) => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.categories
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (categories) {
      setFilteredCategories(
        categories.filter((category) =>
          category.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [categories, searchQuery]);

  if (status === "loading") {
    return <p>Kategoriler yükleniyor...</p>;
  }

  if (status === "failed") {
    return <p>Hata: {error}</p>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Kategori ara..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
      />
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
        {filteredCategories.length === 0 && searchQuery.trim() ? (
          <li>
            <p className="text-gray-500 dark:text-gray-400">
              Kategori bulunamadı
            </p>
          </li>
        ) : (
          filteredCategories.map((category) => (
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
          ))
        )}
      </ul>
    </div>
  );
};

export default CategoryList;
