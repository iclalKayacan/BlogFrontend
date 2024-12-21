import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { Link } from "react-router-dom"; // Admin paneline yönlendirme için

const Menu = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Uygulama Adı</div>
        <div className="flex items-center space-x-4">
          {token ? (
            <>
              <span className="text-white">
                Merhaba, {user?.fullName || user?.username}!
              </span>
              {user?.role === "admin" && ( // Kullanıcı admin ise göster
                <Link
                  to="/admin-panel"
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Giriş Yap
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Kayıt Ol
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Menu;
