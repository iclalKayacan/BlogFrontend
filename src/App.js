import React from "react";
import Header from "./components/Header";
import HomePage from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Header */}
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
