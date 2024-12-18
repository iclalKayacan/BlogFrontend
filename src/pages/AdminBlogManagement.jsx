import React from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

const AdminBlogManagement = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Blog Yönetimi</h1>
      <div className="flex justify-end mb-4">
        <Link
          to="/admin/blogs/new"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Yeni Blog Ekle
        </Link>
      </div>
      <table className="w-full border border-gray-200 shadow-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Başlık</th>
            <th className="p-3 border">Kategori</th>
            <th className="p-3 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>{/* Blogları buraya yerleştirin */}</tbody>
      </table>
    </AdminLayout>
  );
};

export default AdminBlogManagement;
