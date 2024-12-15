import React, { useState, useEffect } from "react";
import HeroSection from "../components/Home/HeroSection";
import RandomPosts from "../components/Home/RandomPosts";
import LatestPosts from "../components/Home/LatestPosts";
import { FaArrowUp } from "react-icons/fa";
import NewsletterSection from "../components/Home/NewsletterSection";

const HomePage = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <HeroSection />
      <RandomPosts />
      <LatestPosts />
      <NewsletterSection />

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-primary hover:bg-secondary text-white p-4 rounded-full shadow-lg transition-opacity duration-300"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-lg" />
        </button>
      )}
    </div>
  );
};

export default HomePage;
