import React from "react";
import Video from "./Video";

const TECH_BADGES = ["#NEXTJS16", "#REACT19", "#THREEJS", "#GEMINI_AI", "#NODE"];

const HomeHeroText = () => {
  return (
    <div className="text-center text-white select-none flex flex-col items-center">
      {/* Editorial Eyebrow Status Pill (Mobile-only) */}
      <div className="inline-flex md:hidden items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/20 shadow-md mb-2 sm:mb-4 animate-fadein">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D3FD50] animate-pulse" />
        <span className="font-mono text-[9px] sm:text-[10px] font-bold text-white/90 uppercase tracking-[0.22em]">
          FULL-STACK & CREATIVE CODER
        </span>
      </div>

      {/* Main Monumental Headline */}
      <div className="font-[font1] flex flex-col items-center">
        <div className="text-[13.5vw] sm:text-[11vw] md:text-[9.5vw] justify-center flex items-center uppercase leading-[14vw] sm:leading-[11.5vw] md:leading-[10vw] tracking-tight">
          The spark
        </div>

        <div className="text-[13.5vw] sm:text-[11vw] md:text-[9.5vw] justify-center flex items-center gap-1.5 sm:gap-3 md:gap-4 uppercase leading-[14vw] sm:leading-[11.5vw] md:leading-[10vw] tracking-tight">
          <span>that</span>
          <div className="h-[6.5vw] w-[17vw] min-h-[22px] min-w-[55px] sm:h-[6vw] sm:w-[15vw] md:h-[5.6vw] md:w-[14vw] rounded-full overflow-hidden border border-white/30 sm:border-2 shadow-xl inline-flex items-center justify-center -translate-y-[0.35vw] md:-translate-y-[0.5vw]">
            <Video />
          </div>
          <span>ignites</span>
        </div>

        <div className="text-[13.5vw] sm:text-[11vw] md:text-[9.5vw] justify-center flex items-center uppercase leading-[14vw] sm:leading-[11.5vw] md:leading-[10vw] tracking-tight">
          creativity
        </div>
      </div>

      {/* Editorial Value Tagline (Mobile-only) */}
      <p className="font-[font1] text-xs sm:text-sm text-white/80 max-w-[280px] sm:max-w-md mx-auto leading-relaxed font-light tracking-wide mt-2.5 sm:mt-4 md:hidden">
        Architecting enterprise full-stack systems, interactive 3D WebGL worlds & neural AI workflows.
      </p>

      {/* Tech Stack Micro-Pills (Mobile-only) */}
      <div className="flex md:hidden flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
        {TECH_BADGES.map((tech) => (
          <span
            key={tech}
            className="px-2 sm:px-2.5 py-0.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 font-mono text-[9px] sm:text-[10px] text-white/70 font-semibold tracking-wider hover:border-[#D3FD50] hover:text-[#D3FD50] transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HomeHeroText;
