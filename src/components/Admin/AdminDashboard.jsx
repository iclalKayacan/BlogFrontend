import React from "react";

const AdminDashboard = ({ stats }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-textDark mb-6">Dashboard</h2>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-bold text-primary mb-2">Toplam Blog</h3>
          <p className="text-2xl font-bold text-textDark">{stats.totalBlogs}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-bold text-primary mb-2">
            Toplam Kullanıcı
          </h3>
          <p className="text-2xl font-bold text-textDark">{stats.totalUsers}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-bold text-primary mb-2">
            Toplam Kategori
          </h3>
          <p className="text-2xl font-bold text-textDark">
            {stats.totalCategories}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-bold text-primary mb-2">Toplam Etiket</h3>
          <p className="text-2xl font-bold text-textDark">{stats.totalTags}</p>
        </div>
      </div>

      {/* Ekstra Bilgiler */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-textDark mb-4">Popüler Blog</h3>
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <h4 className="text-lg font-bold text-primary">
            {stats.popularBlog.title}
          </h4>
          <p className="text-sm text-gray-600">
            Görüntüleme: {stats.popularBlog.views}
          </p>
          <p className="text-sm text-gray-600">
            Beğeniler: {stats.popularBlog.likes}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
