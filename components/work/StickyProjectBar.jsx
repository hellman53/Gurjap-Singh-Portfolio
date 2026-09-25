"use client";

import React from "react";

const StickyProjectBar = ({ activeProject }) => {
  return (
    <>
      {/* Top Header Shield: Prevents scrolling cards from ever peeking above the sticky bar */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[72px] md:h-[80px] bg-[#111] z-30 pointer-events-none"
      />

      {/* Sticky Project Info Bar */}
      <div className="sticky top-[72px] md:top-[80px] z-30 w-full bg-[#111] border-y border-white/15 text-white select-none transition-all duration-300">
        <div className="w-full flex items-center justify-between text-xs md:text-sm font-mono uppercase tracking-wider">
          {/* Left Column: Project Title */}
          <div className="w-1/3 md:w-1/4 px-4 md:px-8 py-3.5 border-r border-white/15 truncate font-semibold">
            <span className="text-[#D3FD50] mr-2 animate-pulse">✦</span>
            <span className="text-white font-[font2] tracking-wide font-bold">
              {activeProject?.title || "SELECTED WORKS"}
            </span>
          </div>

          {/* Center Column: Tagline / Role */}
          <div className="flex-1 px-4 md:px-8 py-3.5 border-r border-white/15 truncate text-white/80 hidden sm:block text-center">
            <span className="tracking-wide">
              {activeProject?.tagline || "FULL-STACK & AI DEVELOPER PORTFOLIO"}
            </span>
          </div>

          {/* Right Column: Year */}
          <div className="w-24 md:w-32 px-4 md:px-6 py-3.5 text-right text-white/60 font-mono">
            <span>{activeProject?.year || "2025"}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StickyProjectBar;
