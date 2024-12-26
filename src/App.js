import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux"; // Redux Provider'ı ekliyoruz
import store from "./store/store"; // Redux Store'u import ediyoruz
import Header from "./components/Header";
import BlogList from "./pages/BlogList";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import BlogCard from "./components/BlogCard";
import BlogDetails from "./pages/BlogDetails";
import BlogManagement from "./pages/Admin/BlogManagement";
import ThemeProvider from "./contexts/ThemeContext";
import BlogsReduxTestPage from "./pages/BlogsReduxTestPage";
import AdminSidebar from "./components/Admin/AdminSidebar";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminBlogForm from "./components/Admin/AdminBlogForm";
import AdminBlogList from "./components/Admin/AdminBlogList";
import CategoryManagement from "./components/Admin/CategoryManagement";
import UserManagement from "./components/Admin/UserManagement";
import TagManagement from "./components/Admin/TagManagement";
import CommentManagement from "./components/Admin/CommentManagement";

function App() {
  const blogs = [
    {
      id: 1,
      title: "Blog Başlık 1",
      summary: "Bu, Blog 1'in kısa özetidir.",
      image: "https://via.placeholder.com/400x200",
      category: "Teknoloji",
    },
    {
      id: 2,
      title: "Blog Başlık 2",
      summary: "Bu, Blog 2'nin kısa özetidir.",
      image: "https://via.placeholder.com/400x200",
      category: "Sağlık",
    },
    {
      id: 3,
      title: "Blog Başlık 3",
      summary: "Bu, Blog 3'ün kısa özetidir.",
      image: "https://via.placeholder.com/400x200",
      category: "Eğitim",
    },
  ];

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/blog/:id" element={<BlogDetails />} />

                {/* Admin Routes */}
                <Route
                  path="/admin/*"
                  element={
                    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
                      <div className="fixed left-0 h-full">
                        <AdminSidebar />
                      </div>
                      <div className="ml-60 flex-1 p-4 overflow-auto">
                        <Routes>
                          <Route index element={<AdminDashboard />} />
                          <Route path="blogs/new" element={<AdminBlogForm />} />
                          <Route path="blogs" element={<AdminBlogList />} />
                          <Route
                            path="blogs/edit/:id"
                            element={<AdminBlogForm />}
                          />
                          <Route
                            path="categories"
                            element={<CategoryManagement />}
                          />
                          <Route path="users" element={<UserManagement />} />
                          <Route path="tags" element={<TagManagement />} />
                          <Route
                            path="comments"
                            element={<CommentManagement />}
                          />
                        </Routes>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </main>

            <Footer />

            <ScrollToTop />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
