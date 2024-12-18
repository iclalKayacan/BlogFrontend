import React from "react";

const Comments = ({ comments }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h3>
      <ul className="space-y-6">
        {comments.map((comment, index) => (
          <li key={index} className="flex space-x-4">
            {/* Kullanıcı Resmi */}
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={comment.avatar || "https://via.placeholder.com/150"}
                alt={comment.author}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              {/* Kullanıcı Bilgisi */}
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
    </div>
  );
};

export default Comments;
