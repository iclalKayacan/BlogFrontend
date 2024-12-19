import React, { useState } from "react";

const LoginRegisterModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true); // Login/Register modunu kontrol eder

  const toggleForm = () => {
    setIsLogin((prev) => !prev); // Login ve Register arasında geçiş yapar
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // Modalın içi tıklanırsa olay dışarıya taşmasın
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // Modal dışında bir yere tıklanırsa kapat
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md"
        onClick={handleModalClick} // Modalın içi tıklanırsa kapatmayı engelle
      >
        {/* Form Başlığı */}
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          {isLogin ? "Giriş Yap" : "Kayıt Ol"}
        </h2>

        {/* Form */}
        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Ad Soyad"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"
            />
          )}
          <input
            type="email"
            placeholder="E-posta"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Şifre"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary"
          >
            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
          </button>
        </form>

        {/* Alternatif Giriş Yöntemleri (Sadece Giriş Yap İçin) */}
        {isLogin && (
          <div className="mt-6">
            <p className="text-center text-gray-600 dark:text-gray-400">veya</p>
            <button className="w-full mt-4 flex items-center justify-center space-x-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span>Google ile Giriş Yap</span>
            </button>
          </div>
        )}

        {/* Alt Mesaj ve Geçiş Linki */}
        <div className="mt-4 text-center">
          {isLogin ? (
            <p className="text-gray-600 dark:text-gray-400">
              Henüz kayıt olmadınız mı?{" "}
              <button
                onClick={toggleForm}
                className="text-primary hover:underline"
              >
                Kayıt Ol
              </button>
            </p>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              Zaten bir hesabınız var mı?{" "}
              <button
                onClick={toggleForm}
                className="text-primary hover:underline"
              >
                Giriş Yap
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterModal;
