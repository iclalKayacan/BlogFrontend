import React, { useState } from "react";

const UserManagement = ({ users, onUserUpdated, onUserDeleted }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleDelete = (userId) => {
    onUserDeleted(userId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUserUpdated(selectedUser);
    setSelectedUser(null);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Kullanıcı Yönetimi</h2>
      <table className="w-full border mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Ad</th>
            <th className="p-2 border">E-posta</th>
            <th className="p-2 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-4">Kullanıcı Düzenle</h3>
          <input
            type="text"
            value={selectedUser.name}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, name: e.target.value })
            }
            className="border p-2 w-full mb-2"
            placeholder="Ad"
          />
          <input
            type="email"
            value={selectedUser.email}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, email: e.target.value })
            }
            className="border p-2 w-full mb-2"
            placeholder="E-posta"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Güncelle
          </button>
        </form>
      )}
    </div>
  );
};

export default UserManagement;
