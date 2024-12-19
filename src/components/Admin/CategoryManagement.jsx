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
    <div className="p-6">
      <h2 className="text-2xl font-bold text-textDark dark:text-textLight mb-6">
        Kategori Yönetimi
      </h2>

      {/* Kategori Tablosu */}
      <table className="w-full bg-white shadow rounded-lg overflow-hidden mb-6">
        <thead>
          <tr className="bg-primary text-textLight">
            <th className="p-3 text-left">Kategori</th>
            <th className="p-3 text-left">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="even:bg-backgroundGray hover:bg-inputGray transition"
            >
              <td className="p-3 text-textDark font-medium">{category.name}</td>
              <td className="p-3">
                <button
                  onClick={() => handleEdit(category)}
                  className="bg-secondary text-textLight px-4 py-2 rounded-lg mr-2 hover:bg-primary transition"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => onCategoryDeleted(category.id)}
                  className="bg-red-500 text-textLight px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Kategori Formları */}
      {editingCategory ? (
        <form
          onSubmit={handleUpdate}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-bold text-textDark mb-4">
            Kategori Düzenle
          </h3>
          <input
            type="text"
            value={editingCategory.name}
            onChange={(e) =>
              setEditingCategory({ ...editingCategory, name: e.target.value })
            }
            className="border border-inputGray p-3 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Kategori Adı"
          />
          <button
            type="submit"
            className="bg-primary text-textLight px-6 py-2 rounded-lg hover:bg-secondary transition"
          >
            Güncelle
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleAdd}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-bold text-textDark mb-4">
            Yeni Kategori Ekle
          </h3>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border border-inputGray p-3 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Kategori Adı"
          />
          <button
            type="submit"
            className="bg-primary text-textLight px-6 py-2 rounded-lg hover:bg-secondary transition"
          >
            Ekle
          </button>
        </form>
      )}
    </div>
  );
};

export default CategoryManagement;
