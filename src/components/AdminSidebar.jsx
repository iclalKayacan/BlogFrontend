import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col fixed">
      <div className="p-4 text-xl font-bold bg-gray-900">Admin Paneli</div>
      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/admin/blogs"
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          Blog Yönetimi
        </NavLink>
        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          Kategori Yönetimi
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          Kullanıcı Yönetimi
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
