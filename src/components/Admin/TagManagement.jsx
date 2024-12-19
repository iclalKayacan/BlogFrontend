import React, { useState } from "react";

const TagManagement = ({ tags, onTagAdded, onTagUpdated, onTagDeleted }) => {
  const [newTag, setNewTag] = useState("");
  const [editingTag, setEditingTag] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    onTagAdded(newTag);
    setNewTag("");
  };

  const handleEdit = (tag) => {
    setEditingTag(tag);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onTagUpdated(editingTag);
    setEditingTag(null);
  };

  return (
    <div className="p-6 bg-backgroundGray rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-textDark mb-6">Etiket Yönetimi</h2>

      {/* Etiket Tablosu */}
      <table className="w-full bg-white shadow rounded-lg overflow-hidden mb-6">
        <thead>
          <tr className="bg-primary text-textLight">
            <th className="p-3 text-left">Etiket</th>
            <th className="p-3 text-left">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr
              key={tag.id}
              className="even:bg-backgroundGray hover:bg-inputGray transition"
            >
              <td className="p-3 text-textDark font-medium">{tag.name}</td>
              <td className="p-3">
                <button
                  onClick={() => handleEdit(tag)}
                  className="bg-secondary text-textLight px-4 py-2 rounded-lg mr-2 hover:bg-hoverSunYellow transition"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => onTagDeleted(tag.id)}
                  className="bg-red-500 text-textLight px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Etiket Formları */}
      {editingTag ? (
        <form
          onSubmit={handleUpdate}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-bold text-textDark mb-4">
            Etiket Düzenle
          </h3>
          <input
            type="text"
            value={editingTag.name}
            onChange={(e) =>
              setEditingTag({ ...editingTag, name: e.target.value })
            }
            className="border border-inputGray p-3 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Etiket Adı"
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
            Yeni Etiket Ekle
          </h3>
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="border border-inputGray p-3 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Etiket Adı"
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

export default TagManagement;
