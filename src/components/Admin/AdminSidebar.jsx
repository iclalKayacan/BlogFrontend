import React from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { path: "/admin", icon: "🏠", label: "Dashboard" },
  { path: "/admin/blogs", icon: "📄", label: "Blog Yönetimi" },
  { path: "/admin/categories", icon: "📂", label: "Kategori Yönetimi" },
  { path: "/admin/users", icon: "👤", label: "Kullanıcı Yönetimi" },
  { path: "/admin/tags", icon: "🏷️", label: "Etiket Yönetimi" },
  { path: "/admin/comments", icon: "💬", label: "Yorum Yönetimi" },
];

const AdminSidebar = () => {
  return (

    <div className="w-60 bg-backgroundDark text-textLight shadow-lg fixed top-0 left-0 h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold p-4 border-b border-gray-700">
        Admin Paneli
      </h2>
      <ul className="p-4 space-y-4">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `w-full text-left flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition ${
                  isActive ? "bg-gray-700 text-hoverSunYellow" : ""
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
