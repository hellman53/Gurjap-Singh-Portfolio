import React from "react";
import TransitionLink from "@/components/common/TransitionLink";
import { SocialLinksList } from "./SocialFloating";
import "./homePart.css";

const HomeBottomText = () => {
  return (
    <div className="w-full flex flex-col items-center gap-3 sm:gap-4 select-none pb-2 sm:pb-4 md:pb-0">
      {/* Primary Action Buttons: Symmetrical, equal-height capsules on mobile, monumental K72 style on desktop */}
      <div className="font-[font2] flex items-center justify-center gap-2.5 sm:gap-3 md:gap-4 w-full max-w-[340px] sm:max-w-md md:max-w-none text-white px-3">
        <TransitionLink href="/projects" className="flex-1 md:flex-initial text-center">
          <span className="link-span w-full md:w-auto inline-block text-center py-2.5 px-4 sm:py-3 sm:px-6 rounded-full border border-white/40 md:border-4 md:border-white bg-black/55 md:bg-transparent backdrop-blur-md md:backdrop-blur-none text-xs sm:text-sm md:text-[5vw] lg:text-[6vw] font-semibold md:font-normal leading-normal md:leading-[7vw] uppercase tracking-wider md:tracking-normal whitespace-nowrap transition-all duration-300 hover:border-[#D3FD50] hover:text-[#D3FD50] hover:bg-black/75 hover:scale-[1.02] active:scale-95 cursor-pointer shadow-lg md:shadow-none">
            Projects
          </span>
        </TransitionLink>

        <TransitionLink href="/about-me" className="flex-1 md:flex-initial text-center">
          <span className="link-span w-full md:w-auto inline-block text-center py-2.5 px-4 sm:py-3 sm:px-6 rounded-full border border-white/40 md:border-4 md:border-white bg-black/55 md:bg-transparent backdrop-blur-md md:backdrop-blur-none text-xs sm:text-sm md:text-[5vw] lg:text-[6vw] font-semibold md:font-normal leading-normal md:leading-[7vw] uppercase tracking-wider md:tracking-normal whitespace-nowrap transition-all duration-300 hover:border-[#D3FD50] hover:text-[#D3FD50] hover:bg-black/75 hover:scale-[1.02] active:scale-95 cursor-pointer shadow-lg md:shadow-none">
            About me
          </span>
        </TransitionLink>
      </div>

      {/* Mobile-Only Social Dock: Integrated cleanly beneath the buttons with no overlap */}
      <div className="flex md:hidden items-center justify-center bg-black/60 backdrop-blur-md px-4.5 py-1.5 sm:px-5 sm:py-2 rounded-full border border-white/20 shadow-lg mt-0.5">
        <SocialLinksList iconSize="text-base sm:text-lg" gap="gap-4 sm:gap-5" />
      </div>
    </div>
  );
};

export default HomeBottomText;
