import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Header from "./components/Header";
import BlogList from "./pages/BlogList";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import BlogDetails from "./pages/BlogDetails";
import ThemeProvider from "./contexts/ThemeContext";
import AdminSidebar from "./components/Admin/AdminSidebar";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminBlogForm from "./components/Admin/AdminBlogForm";
import AdminBlogList from "./components/Admin/AdminBlogList";
import CategoryManagement from "./components/Admin/CategoryManagement";
import UserManagement from "./components/Admin/UserManagement";
import TagManagement from "./components/Admin/TagManagement";
import CommentManagement from "./components/Admin/CommentManagement";

function App() {
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
                <Route path="/blogs/:id" element={<BlogDetails />} />

                <Route path="/blogs" element={<BlogList />} />

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
