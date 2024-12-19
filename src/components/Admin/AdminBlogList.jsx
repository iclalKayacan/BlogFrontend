import React from "react";

const AdminBlogList = ({ blogs, onDelete, onEdit }) => {
  return (
    <div className="bg-backgroundGray p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-textDark mb-4">Blog Listesi</h2>
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="border border-inputGray p-4 mb-4 rounded-lg bg-white shadow-md hover:shadow-lg transition"
        >
          <h3 className="text-xl font-bold text-primary mb-2">{blog.title}</h3>
          <p className="text-sm text-gray-600 mb-1">Yazar: {blog.author}</p>
          <p className="text-sm text-gray-600 mb-4">Durum: {blog.status}</p>
          <button
            onClick={() => onEdit(blog)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-yellow-600 transition"
          >
            Düzenle
          </button>
          <button
            onClick={() => onDelete(blog.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Sil
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminBlogList;
