import React, { useState } from "react";

const CommentManagement = ({ comments, onApprove, onDelete }) => {
  const [approvedMessage, setApprovedMessage] = useState(null);

  const handleApprove = (commentId) => {
    const comment = comments.find((c) => c.id === commentId);
    onApprove(commentId); // Onay işlemini çağır
    setApprovedMessage(`"${comment.content}" yorumunu onayladınız.`);

    // Mesajı 3 saniye sonra gizle
    setTimeout(() => setApprovedMessage(null), 3000);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-textDark dark:text-textLight mb-6">
        Yorum Yönetimi
      </h2>

      {/* Onaylama Mesajı */}
      {approvedMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 border border-green-500 rounded-lg">
          {approvedMessage}
        </div>
      )}

      {comments.length === 0 ? (
        <p className="text-gray-600">Henüz yorum bulunmamaktadır.</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="border border-inputGray p-4 mb-4 rounded-lg bg-white shadow-md hover:shadow-lg transition"
          >
            <p className="text-sm text-gray-800 mb-2">
              Yazan: <span className="font-semibold">{comment.author}</span>
            </p>
            <p className="text-base text-gray-700 mb-4">{comment.content}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleApprove(comment.id)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Onayla
              </button>
              <button
                onClick={() => onDelete(comment.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Sil
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentManagement;
