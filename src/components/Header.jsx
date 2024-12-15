import React, { useState, useEffect } from "react";
import { FaSearch, FaRegUser, FaSun, FaMoon, FaPenNib } from "react-icons/fa";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    console.log("Dark mode toggled");
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <header className="bg-backgroundLight dark:bg-backgroundDark shadow-md">
      <div className="container mx-auto px-8 py-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <FaPenNib className="text-3xl text-primary" />
          <h1 className="text-3xl font-bold text-textDark dark:text-textLight">
            Blog System
          </h1>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6 text-lg text-textDark dark:text-textLight ">
            <li>
              <a href="/" className="hover:text-primary">
                Ana Sayfa
              </a>
            </li>
            <li>
              <a href="/blogs" className="hover:text-primary">
                Bloglar
              </a>
            </li>

            <li>
              <a href="/about" className="hover:text-primary">
                Hakkımızda
              </a>
            </li>
            <li>
              <a href="/authors" className="hover:text-primary">
                Yazarlar
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-primary">
                İletişim
              </a>
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
          <a
            href="/create"
            className="bg-primary hover:bg-secondary text-white text-base px-5 py-3 rounded-full text-sm flex items-center space-x-2"
          >
            <FaPenNib />
            <span>Blog Oluştur</span>
          </a>

          {/* Profile */}
          <a
            href="/profile"
            className="bg-backgroundGray text-gray-800 p-3 rounded-full flex items-center space-x-2"
            onClick={() => console.log("Profile icon clicked")}
          >
            <FaRegUser className="text-lg" />
          </a>

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
    </header>
  );
};

export default Header;
