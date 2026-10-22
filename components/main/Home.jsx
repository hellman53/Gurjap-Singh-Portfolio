import React from "react";
import Video from "@/components/home/Video";
import HomeHeroText from "@/components/home/HomeHeroText";
import HomeBottomText from "@/components/home/HomeBottomText";
import SocialFloating from "@/components/home/SocialFloating";

const Home = () => {
  return (
    <main className="h-[100dvh] w-full overflow-hidden relative select-none">
      {/* Background Video */}
      <div className="h-full w-full absolute inset-0 z-0 pointer-events-none">
        <Video />
      </div>

      {/* Hero Content */}
      <div className="h-full w-full relative z-10 flex flex-col justify-between pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-6 md:pb-8 px-4 sm:px-6 md:px-8">
        <div className="my-auto w-full">
          <HomeHeroText />
        </div>
        <HomeBottomText />
      </div>

      {/* Floating Elements (Bottom dock on mobile, bottom-right on desktop) */}
      <SocialFloating />
    </main>
  );
};

export default Home;
