import React from "react";
import Video from "../components/home/Video";
import HomeHeroText from "@/components/home/HomeHeroText";
import HomeBottomText from "@/components/home/HomeBottomText";
import SocialFloating from "@/components/home/SocialFloating";
import FloatingName from "@/components/home/FloatingName";

const Home = () => {
  return (
    <div className="h-screen overflow-hidden relative">
      {/* Background Video */}
      <div className="h-full w-full fixed inset-0">
        <Video />
      </div>

      {/* Hero Content */}
      <div className="h-full w-full relative flex flex-col justify-between">
        <HomeHeroText />
        <HomeBottomText />
      </div>

      {/* Floating Elements */}
      <SocialFloating />
      <FloatingName />
    </div>
  );
};


export default Home;
