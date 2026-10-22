"use client";

import React, { useState } from "react";
import TransitionLink from "./TransitionLink";
import MenuOverlay from "./MenuOverlay";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-6 sm:py-5 md:px-10 md:py-7 flex items-center justify-between pointer-events-none select-none">
        {/* Brand / Logo (Clickable to Home) - Matching rounded-full pill design */}
        <TransitionLink
          href="/"
          className="pointer-events-auto group flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/25 bg-black/60 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-[#D3FD50] hover:scale-105 active:scale-95"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D3FD50] animate-pulse" />
          <span className="font-[font2] text-xs sm:text-sm md:text-base font-semibold tracking-wider text-white uppercase group-hover:text-[#D3FD50] transition-colors whitespace-nowrap">
            GURJAP SINGH
          </span>
        </TransitionLink>

        {/* K72 Style Menu Button: Matching rounded-full pill design */}
        <button
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open navigation menu"
          className="pointer-events-auto flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-black/60 md:bg-black/80 border border-white/25 text-white backdrop-blur-md shadow-lg transition-all duration-300 hover:bg-[#D3FD50] hover:border-[#D3FD50] hover:text-black hover:scale-105 active:scale-95 cursor-pointer group"
        >
          <span className="font-[font2] font-semibold text-xs sm:text-sm tracking-wider uppercase text-white group-hover:text-black transition-colors duration-300">
            MENU
          </span>
          <div className="flex flex-col justify-center items-end gap-1 w-4 sm:w-5">
            <span className="w-4 sm:w-5 h-[2px] bg-white group-hover:bg-black rounded-full transition-all duration-300" />
            <span className="w-2.5 sm:w-3.5 h-[2px] bg-white group-hover:bg-black rounded-full transition-all duration-300 group-hover:w-4 sm:group-hover:w-5" />
          </div>
        </button>
      </header>

      {/* Full-Screen K72 Menu Overlay */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Navbar;
