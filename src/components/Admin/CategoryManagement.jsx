import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/categoriesSlice";
import axios from "axios";

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const { items: categories, status } = useSelector(
    (state) => state.categories
  );
  const [newCategory, setNewCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-blue-500");
  const [error, setError] = useState("");

  const colorOptions = [
    { name: "Kırmızı", value: "bg-red-500" },
    { name: "Mavi", value: "bg-blue-500" },
    { name: "Yeşil", value: "bg-green-500" },
    { name: "Sarı", value: "bg-yellow-500" },
    { name: "Mor", value: "bg-purple-500" },
    { name: "Pembe", value: "bg-pink-500" },
    { name: "Turuncu", value: "bg-orange-500" },
    { name: "Gri", value: "bg-gray-500" },
  ];

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setError("");

    if (!newCategory.trim()) {
      setError("Kategori adı boş olamaz");
      return;
    }

    try {
      const response = await axios.post("https://localhost:7079/api/Category", {
        name: newCategory.trim(),
        color: selectedColor,
      });

      if (response.data) {
        dispatch(fetchCategories());
        setNewCategory("");
        setSelectedColor("bg-blue-500");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Kategori eklenirken bir hata oluştu"
      );
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) {
      return;
    }

    try {
      await axios.delete(`https://localhost:7079/api/Category/${id}`);
      dispatch(fetchCategories());
    } catch (error) {
      console.error("Kategori silinirken hata:", error);
      alert("Kategori silinirken bir hata oluştu");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Kategori Yönetimi
      </h2>

      {/* Kategori Ekleme Formu */}
      <form onSubmit={handleAddCategory} className="mb-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Yeni kategori adı"
              className="flex-1 p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500"
            />
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {colorOptions.map((color) => (
                <option key={color.value} value={color.value}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            Kategori Ekle
          </button>
        </div>
      </form>

      {/* Kategori Listesi */}
      {status === "loading" ? (
        <div className="text-gray-900 dark:text-white">Yükleniyor...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full ${category.color}`}
                  ></div>
                  <h3 className="font-medium">{category.name}</h3>
                </div>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
