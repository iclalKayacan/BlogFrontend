import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import BlogList from "./pages/BlogList";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import BlogCard from "./components/BlogCard";
import BlogDetails from "./pages/BlogDetails";

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
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/"
              element={
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              }
            />
            <Route path="/blogs/:id" element={<BlogDetails />} />

            <Route path="/blogs" element={<BlogList />} />
          </Routes>
        </main>

        <Footer />

        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
