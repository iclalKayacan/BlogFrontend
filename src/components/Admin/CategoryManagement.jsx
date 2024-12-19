import React, { useState } from "react";

const CategoryManagement = ({
  categories,
  onCategoryAdded,
  onCategoryUpdated,
  onCategoryDeleted,
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    onCategoryAdded(newCategory);
    setNewCategory("");
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onCategoryUpdated(editingCategory);
    setEditingCategory(null);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Kategori Yönetimi</h2>
      <table className="w-full border mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Kategori</th>
            <th className="p-2 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="p-2 border">{category.name}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleEdit(category)}
                  className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => onCategoryDeleted(category.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingCategory ? (
        <form onSubmit={handleUpdate} className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-4">Kategori Düzenle</h3>
          <input
            type="text"
            value={editingCategory.name}
            onChange={(e) =>
              setEditingCategory({ ...editingCategory, name: e.target.value })
            }
            className="border p-2 w-full mb-2"
            placeholder="Kategori Adı"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Güncelle
          </button>
        </form>
      ) : (
        <form onSubmit={handleAdd} className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-4">Yeni Kategori Ekle</h3>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border p-2 w-full mb-2"
            placeholder="Kategori Adı"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Ekle
          </button>
        </form>
      )}
    </div>
  );
};

export default CategoryManagement;
