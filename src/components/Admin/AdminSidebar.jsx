import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = ({ setView }) => {
  return (
    <div className="w-60 bg-gray-800 text-white shadow-lg min-h-screen">
      <h2 className="text-2xl font-bold p-4 border-b border-gray-700">
        Admin Paneli
      </h2>
      <ul className="p-4 space-y-4">
        <li>
          <button
            onClick={() => setView("blogs")}
            className="hover:text-gray-400 w-full text-left"
          >
            Blog Yönetimi
          </button>
        </li>
        <li>
          <button
            onClick={() => setView("users")}
            className="hover:text-gray-400 w-full text-left"
          >
            Kullanıcı Yönetimi
          </button>
        </li>
        <li>
          <button
            onClick={() => setView("categories")}
            className="hover:text-gray-400 w-full text-left"
          >
            Kategori Yönetimi
          </button>
        </li>
        <li>
          <Link to="/" className="hover:text-gray-400">
            Anasayfa
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
