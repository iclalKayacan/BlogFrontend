import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalCategories: 0,
    totalComments: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // API'den istatistikleri al
        const response = await axios.get(
          "https://localhost:7079/api/Dashboard/stats"
        );
        setStats(response.data);
      } catch (error) {
        console.error("İstatistikler yüklenirken hata:", error);
        // Hata durumunda varsayılan değerleri kullan
        setStats({
          totalBlogs: 0,
          totalCategories: 0,
          totalComments: 0,
          totalUsers: 0,
        });
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Blog İstatistikleri */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
            Toplam Blog
          </h3>
          <p className="text-3xl font-bold text-primary mt-2">
            {stats.totalBlogs}
          </p>
        </div>

        {/* Kategori İstatistikleri */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
            Toplam Kategori
          </h3>
          <p className="text-3xl font-bold text-primary mt-2">
            {stats.totalCategories}
          </p>
        </div>

        {/* Yorum İstatistikleri */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
            Toplam Yorum
          </h3>
          <p className="text-3xl font-bold text-primary mt-2">
            {stats.totalComments}
          </p>
        </div>

        {/* Kullanıcı İstatistikleri */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
            Toplam Kullanıcı
          </h3>
          <p className="text-3xl font-bold text-primary mt-2">
            {stats.totalUsers}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
