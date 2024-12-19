import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = ({ setView }) => {
  return (
    <div className="w-60 bg-backgroundDark text-textLight shadow-lg min-h-screen">
      <h2 className="text-2xl font-bold p-4 border-b border-gray-700">
        Admin Paneli
      </h2>
      <ul className="p-4 space-y-4">
        <li>
          <button
            onClick={() => setView("blogs")}
            className="w-full text-left flex items-center space-x-2 hover:text-hoverSunYellow transition"
          >
            📄 Blog Yönetimi
          </button>
        </li>
        <li>
          <button
            onClick={() => setView("users")}
            className="w-full text-left flex items-center space-x-2 hover:text-hoverSunYellow transition"
          >
            👤 Kullanıcı Yönetimi
          </button>
        </li>
        <li>
          <button
            onClick={() => setView("categories")}
            className="w-full text-left flex items-center space-x-2 hover:text-hoverSunYellow transition"
          >
            📂 Kategori Yönetimi
          </button>
        </li>
        <li>
          <button
            onClick={() => setView("tags")}
            className="w-full text-left flex items-center space-x-2 hover:text-hoverSunYellow transition"
          >
            🏷️ Etiket Yönetimi
          </button>
        </li>
        <li>
          <button
            onClick={() => setView("comments")}
            className="w-full text-left flex items-center space-x-2 hover:text-hoverSunYellow transition"
          >
            💬 Yorum Yönetimi
          </button>
        </li>
        <li>
          <Link
            to="/"
            className="w-full text-left flex items-center space-x-2 hover:text-hoverSunYellow transition"
          >
            🏠 Anasayfa
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
