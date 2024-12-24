import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addComment } from "../store/commentsSlice";

const LoginPromptModal = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 dark:text-white">
            Giriş Yapmanız Gerekiyor
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Yorum yapabilmek için lütfen giriş yapın veya hesap oluşturun.
          </p>
          <div className="flex space-x-3 justify-center">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark transition duration-200"
            >
              Giriş Yap
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white transition duration-200"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentForm = ({ blogId }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, token, user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isAuthenticated || !token) {
      setShowLoginPrompt(true);
      return;
    }

    if (!content.trim()) {
      setError("Yorum boş olamaz");
      return;
    }

    setIsSubmitting(true);

    try {
      const commentData = {
        Content: content.trim(),
        BlogId: parseInt(blogId),
        Author: user?.username || user?.email,
      };

      await dispatch(addComment(commentData)).unwrap();
      setContent("");
      alert("Yorumunuz başarıyla eklendi!");
      window.location.reload();
    } catch (err) {
      if (!isAuthenticated) {
        setShowLoginPrompt(true);
      } else {
        setError("Yorum eklenirken bir hata oluştu");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="mb-6">
        <div className="p-4 bg-backgroundGray dark:bg-backgroundDark border border-inputGray dark:border-gray-700 rounded-lg flex items-center">
          <div className="flex items-center justify-center bg-primary text-white rounded-full h-10 w-10 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1 4v-4m6 8H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-textDark dark:text-textLight font-medium text-lg">
              Yorum yapmak için giriş yapmalısınız
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Görüşlerinizi paylaşabilmek için{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-primary font-semibold underline hover:text-secondary transition"
              >
                giriş yapın
              </button>{" "}
              veya bir hesap oluşturun.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      {showLoginPrompt && (
        <LoginPromptModal onClose={() => setShowLoginPrompt(false)} />
      )}
      <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
        <span className="font-semibold text-gray-700 dark:text-gray-300">
          {user?.username || user?.email}
        </span>{" "}
        olarak yorum yapıyorsunuz
      </div>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            rows="4"
            placeholder="Yorumunuzu yazın..."
            required
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          className={`px-4 py-2 bg-primary text-white rounded-lg transition duration-200 ${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-primaryDark"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Ekleniyor..." : "Yorum Ekle"}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
