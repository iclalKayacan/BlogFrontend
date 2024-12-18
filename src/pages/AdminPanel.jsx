import React from "react";
import AdminLayout from "../components/AdminLayout";

const AdminPanel = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Admin Paneli</h1>
      <p>
        Buradan bloglarınızı, kategorilerinizi ve kullanıcılarınızı yönetin.
      </p>
    </AdminLayout>
  );
};

export default AdminPanel;
