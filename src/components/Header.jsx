import React, { useState, useEffect, useContext, useRef } from "react";
import { FaSearch, FaRegUser, FaSun, FaMoon, FaPenNib } from "react-icons/fa";
import { ThemeContext } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import LoginRegisterModal from "./LoginRegisterModal";

const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, token } = useSelector((state) => state.auth); // Redux'tan user ve token bilgisi
  const dispatch = useDispatch();

  const profileMenuRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Menü dışında tıklamaları yakalama
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout()); // Redux logout işlemi
    setIsProfileMenuOpen(false); // Menü kapat
  };

  return (
    <header className="bg-backgroundLight dark:bg-backgroundDark shadow-md">
      <div className="container mx-auto px-8 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <FaPenNib className="text-3xl text-primary" />
          <h1 className="text-2xl font-bold text-textDark dark:text-textLight">
            Blog System
          </h1>
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6 text-base text-textDark dark:text-textLight">
            <li>
              <Link to="/" className="hover:text-primary">
                Ana Sayfa
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-primary">
                Bloglar
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link to="/authors" className="hover:text-primary">
                Yazarlar
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                İletişim
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative flex items-center">
            <FaSearch className="absolute left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Ara..."
              className="bg-inputGray text-gray-800 rounded-full pl-10 pr-4 py-2 focus:outline-none"
            />
          </div>

          {/* Create Blog */}
          <Link
            to="/create"
            className="bg-primary hover:bg-secondary text-white text-base px-5 py-3 rounded-full text-sm flex items-center space-x-2"
          >
            <FaPenNib />
            <span>Blog Oluştur</span>
          </Link>

          {/* Profile */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={toggleProfileMenu}
              className="bg-backgroundGray text-gray-800 p-3 rounded-full flex items-center"
            >
              <FaRegUser className="text-lg" />
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-48 z-10">
                <ul>
                  {/* Admin Panel */}
                  {user?.role?.toLowerCase() === "admin" && (
                    <li>
                      <Link
                        to="/admin/blogs"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Admin Panel
                      </Link>
                    </li>
                  )}

                  {/* Kullanıcı Adı */}
                  {token ? (
                    <>
                      <li>
                        <span className="block px-4 py-2 text-gray-800">
                          {user?.username || "Misafir"}
                        </span>
                      </li>
                      <li>
                        <button
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          onClick={handleLogout}
                        >
                          Çıkış Yap
                        </button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <button
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={toggleModal}
                      >
                        Giriş Yap/Kayıt Ol
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Dark/Light Mode */}
          <button
            onClick={toggleDarkMode}
            className="bg-backgroundGray p-3 rounded-full"
            aria-label="Dark Mode Toggle"
          >
            {darkMode ? (
              <FaMoon className="text-secondary text-lg" />
            ) : (
              <FaSun className="text-sunYellow text-lg" />
            )}
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <LoginRegisterModal onClose={toggleModal} />}
    </header>
  );
};

export default Header;
