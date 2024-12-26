import React, { useState, useEffect } from "react";
import axios from "axios";

const TagManagement = () => {
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get("https://localhost:7079/api/Tags");
      setTags(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Etiketler yüklenirken hata:", error);
      setError("Etiketler yüklenirken bir hata oluştu");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:7079/api/Tags", {
        name: newTagName,
      });
      setTags([...tags, response.data]);
      setNewTagName("");
    } catch (error) {
      setError("Etiket eklenirken bir hata oluştu");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu etiketi silmek istediğinize emin misiniz?")) {
      try {
        await axios.delete(`https://localhost:7079/api/Tags/${id}`);
        setTags(tags.filter((tag) => tag.id !== id));
      } catch (error) {
        setError("Etiket silinirken bir hata oluştu");
      }
    }
  };

  if (loading) return <div className="p-4">Yükleniyor...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Etiket Yönetimi
      </h1>

      {/* Etiket Ekleme Formu */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            placeholder="Yeni etiket adı"
            className="flex-1 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Ekle
          </button>
        </div>
      </form>

      {/* Etiket Listesi */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Etiket Adı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {tags && tags.length > 0 ? (
              tags.map((tag) => (
                <tr
                  key={tag.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                    {tag.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDelete(tag.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  Etiket bulunamadı
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TagManagement;
