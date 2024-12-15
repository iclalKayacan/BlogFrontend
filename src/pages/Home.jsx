import React from "react";
import HeroSection from "../components/Home/HeroSection";
import RandomPosts from "../components/Home/RandomPosts";
import LatestPosts from "../components/Home/LatestPosts";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <RandomPosts />
      <LatestPosts />
    </div>
  );
};

export default HomePage;
