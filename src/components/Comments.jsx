import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../store/commentsSlice";

const Comments = ({ comments, blogId }) => {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      dispatch(
        addComment({
          blogId,
          content: newComment,
          author: "Current User", // Gerçek kullanıcı adını buraya ekleyin
        })
      );
      setNewComment(""); // Yorum gönderildikten sonra alanı sıfırla
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h3>
      <ul className="space-y-6">
        {comments.map((comment, index) => (
          <li key={index} className="flex space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={comment.avatar || "https://via.placeholder.com/150"}
                alt={comment.author}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h5 className="font-semibold text-gray-700 dark:text-gray-200">
                {comment.author}
              </h5>
              <p className="text-xs text-gray-500 mb-2">{comment.date}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {comment.content}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="mt-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-4 border rounded-lg shadow-sm dark:bg-gray-700 dark:text-white"
          rows="4"
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondaryDark transition duration-200"
        >
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default Comments;
