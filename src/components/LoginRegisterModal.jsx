import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../store/authSlice";

const LoginRegisterModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { isLoading, error, token } = useSelector((state) => state.auth); // Redux'tan token'ı alıyoruz
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "", // Sadece kayıt için gerekli
  });
  const [successMessage, setSuccessMessage] = useState(""); // Başarı mesajı için state

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setFormData({ username: "", password: "", fullName: "" });
    setSuccessMessage(""); // Form değiştirildiğinde başarı mesajını sıfırla
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const resultAction = await dispatch(
        login({ username: formData.username, password: formData.password })
      );

      if (resultAction.type === "auth/login/fulfilled") {
        // Giriş başarılı
        setSuccessMessage("Giriş başarılı!"); // Başarı mesajını güncelle
      }
    } else {
      const resultAction = await dispatch(register(formData));

      if (resultAction.type === "auth/register/fulfilled") {
        // Kayıt başarılı
        setSuccessMessage("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">
          {isLogin ? "Giriş Yap" : "Kayıt Ol"}
        </h2>
        {/* Hata mesajı */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {/* Başarı mesajı */}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="fullName"
              placeholder="Ad Soyad"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          )}
          <input
            type="text"
            name="username"
            placeholder="Kullanıcı Adı"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Şifre"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md"
            disabled={isLoading}
          >
            {isLoading
              ? "Lütfen Bekleyin..."
              : isLogin
              ? "Giriş Yap"
              : "Kayıt Ol"}
          </button>
        </form>
        <div className="mt-4 text-center">
          {isLogin ? (
            <p>
              Henüz kayıt olmadınız mı?{" "}
              <button
                onClick={toggleForm}
                className="text-primary hover:underline"
              >
                Kayıt Ol
              </button>
            </p>
          ) : (
            <p>
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
