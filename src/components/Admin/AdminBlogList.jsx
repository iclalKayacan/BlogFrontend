import React from "react";

const AdminBlogList = ({ blogs, onDelete, onEdit }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} className="border p-2 mb-2">
          <h3 className="text-lg font-semibold">{blog.title}</h3>
          <p className="text-sm text-gray-600">Yazar: {blog.author}</p>
          <p>{blog.status}</p>
          <button
            onClick={() => onEdit(blog)}
            className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
          >
            Düzenle
          </button>
          <button
            onClick={() => onDelete(blog.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Sil
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminBlogList;
