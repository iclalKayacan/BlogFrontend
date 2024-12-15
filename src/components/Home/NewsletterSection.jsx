import React from "react";
import { FaPaperPlane } from "react-icons/fa";

const NewsletterSection = () => {
  return (
    <section className="py-12 px-4 md:px-8 bg-white dark:bg-backgroundDark">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between bg-white dark:bg-backgroundDark p-8 rounded-lg ">
        {/* Sol Tarafta Başlık ve Açıklama */}
        <div className="mb-6 md:mb-0 md:w-1/2">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Subscribe Newsletter
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Get our latest news straight into your inbox
          </p>
        </div>

        {/* Sağ Tarafta Email Input ve Buton */}
        <div className="w-full md:w-1/2 flex">
          <input
            type="email"
            placeholder="Enter your email..."
            className="flex-1 p-4 text-lg rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sunYellow text-gray-800"
          />
          <button
            className="bg-sunYellow hover:bg-hoverSunYellow text-white px-8 py-4 text-lg rounded-r-lg flex items-center justify-center transition-all"
            aria-label="Subscribe"
          >
            <FaPaperPlane className="text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
