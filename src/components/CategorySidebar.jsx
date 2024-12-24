import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, setSelectedCategory } from "../store/categoriesSlice";
import { FiSearch } from "react-icons/fi";

const CategorySidebar = () => {
  const dispatch = useDispatch();
  const {
    items: categories,
    status,
    selectedCategory,
    error,
  } = useSelector((state) => state.categories);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  // Kategorileri filtrele
  useEffect(() => {
    if (categories) {
      setFilteredCategories(
        categories.filter((category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [categories, searchTerm]);

  // Loading durumu
  if (status === "loading") {
    return (
      <div className="bg-backgroundLight dark:bg-backgroundDark rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4 text-textDark dark:text-textLight">
          Kategoriler
        </h2>
        <div className="animate-pulse mb-4">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        </div>
        <div className="space-y-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Hata durumu
  if (status === "failed") {
    return (
      <div className="bg-backgroundLight dark:bg-backgroundDark rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4 text-textDark dark:text-textLight">
          Kategoriler
        </h2>
        <div className="text-red-500 dark:text-red-400 text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-backgroundLight dark:bg-backgroundDark rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-textDark dark:text-textLight">
        Kategoriler
      </h2>

      {/* Arama kutusu */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Kategori ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pl-10 rounded-md bg-inputGray dark:bg-gray-700 
                   text-textDark dark:text-textLight placeholder-gray-500 
                   focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <FiSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 
                          text-gray-500 dark:text-gray-400"
        />
      </div>

      {/* Kategori listesi */}
      <div className="space-y-2">
        <button
          onClick={() => dispatch(setSelectedCategory(null))}
          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
            selectedCategory === null
              ? "bg-primary text-white"
              : "text-textDark dark:text-textLight hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          Tümü
        </button>

        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => dispatch(setSelectedCategory(category.id))}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                selectedCategory === category.id
                  ? "bg-primary text-white"
                  : "text-textDark dark:text-textLight hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{category.name}</span>
                {category.color && (
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></span>
                )}
              </div>
            </button>
          ))
        ) : searchTerm ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm py-2">
            Aranan kategori bulunamadı.
          </p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm py-2">
            Henüz kategori bulunmuyor.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategorySidebar;
