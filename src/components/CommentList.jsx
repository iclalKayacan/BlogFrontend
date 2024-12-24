import React from "react";
import { useDispatch } from "react-redux";
import { deleteComment, updateComment } from "../store/commentsSlice";

const CommentList = ({ comments }) => {
  const dispatch = useDispatch();

  // API'den gelen veriyi güvenli bir şekilde işle
  const commentsList = comments?.$values || [];

  const handleDelete = async (id) => {
    if (window.confirm("Bu yorumu silmek istediğinizden emin misiniz?")) {
      try {
        await dispatch(deleteComment(id)).unwrap();
      } catch (err) {
        console.error("Failed to delete comment:", err);
      }
    }
  };

  return (
    <div className="space-y-4">
      {Array.isArray(commentsList) &&
        commentsList.map((comment) => (
          <div
            key={comment.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  {comment.author}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {comment.content}
            </p>
          </div>
        ))}
      {(!commentsList || commentsList.length === 0) && (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          Henüz yorum yapılmamış. İlk yorumu siz yapın!
        </p>
      )}
    </div>
  );
};

export default CommentList;
