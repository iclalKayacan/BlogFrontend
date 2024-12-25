import React from "react";
import { useDispatch } from "react-redux";
import { deleteComment, updateComment } from "../store/commentsSlice";

const CommentList = ({ comments }) => {
  const dispatch = useDispatch();

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
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
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
