import React, { useState } from "react";

const UserManagement = ({ users, onUserUpdated, onUserDeleted }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleDelete = (userId) => {
    const confirmed = window.confirm(
      "Bu kullanıcıyı silmek istediğinize emin misiniz?"
    );
    if (confirmed) {
      onUserDeleted(userId);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUserUpdated(selectedUser);
    setSelectedUser(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-textDark dark:text-textLight mb-6">
        Kullanıcı Yönetimi
      </h2>

      {/* Kullanıcı Tablosu */}
      <table className="w-full bg-white shadow rounded-lg overflow-hidden mb-6">
        <thead>
          <tr className="bg-primary text-textLight">
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Ad</th>
            <th className="p-3 text-left">E-posta</th>
            <th className="p-3 text-left">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="even:bg-backgroundGray hover:bg-inputGray transition"
            >
              <td className="p-3 text-textDark font-medium">{user.id}</td>
              <td className="p-3 text-textDark">{user.name}</td>
              <td className="p-3 text-textDark">{user.email}</td>
              <td className="p-3">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-secondary text-textLight px-4 py-2 rounded-lg mr-2 hover:bg-primary transition"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-textLight px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Kullanıcı Düzenleme Formu */}
      {selectedUser && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-bold text-textDark mb-4">
            Kullanıcı Düzenle
          </h3>
          <input
            type="text"
            value={selectedUser.name}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, name: e.target.value })
            }
            className="border border-inputGray p-3 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ad"
          />
          <input
            type="email"
            value={selectedUser.email}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, email: e.target.value })
            }
            className="border border-inputGray p-3 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="E-posta"
          />
          <button
            type="submit"
            className="bg-primary text-textLight px-6 py-2 rounded-lg hover:bg-secondary transition"
          >
            Güncelle
          </button>
        </form>
      )}
    </div>
  );
};

export default UserManagement;
