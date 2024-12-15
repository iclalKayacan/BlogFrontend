import React from "react";
import Header from "./components/Header";
import HomePage from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Header */}
      <Header />
      <HomePage />
    </div>
  );
}

export default App;
