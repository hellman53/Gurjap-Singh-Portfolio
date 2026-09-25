"use client";

import React from "react";
import TransitionLink from "@/components/common/TransitionLink";
import { FiArrowUpRight, FiArrowLeft } from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";

const PlaygroundFooter = () => {
  return (
    <footer className="w-full bg-[#0a0a0a] text-white border-t border-white/15 pt-20 md:pt-28 pb-12 md:pb-16 px-6 md:px-14 select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-14 md:gap-18">
        {/* Main Call to Action Block */}
        <div className="flex flex-col gap-8 md:gap-10 pb-16 md:pb-20 border-b border-white/15">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full border border-[#D3FD50]/30 bg-[#D3FD50]/10 text-xs font-mono uppercase tracking-widest text-[#D3FD50]">
            <IoSparklesOutline className="animate-spin text-sm" style={{ animationDuration: "6s" }} />
            <span>EXPERIMENTAL COLLABORATION</span>
          </div>

          {/* Heading: Full-width, bold 2 lines, no awkward side-squeezing */}
          <h2 className="font-[font2] font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-white leading-none">
            HAVE A CREATIVE IDEA? <br />
            <span className="text-[#D3FD50]">LET&apos;S ENGINEER IT.</span>
          </h2>

          {/* Action Row: Description on left, The Two Action Buttons on right */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-2">
            <p className="font-mono text-xs sm:text-sm text-white/60 uppercase tracking-widest leading-relaxed max-w-xl">
              From zero-gravity WebGL physics to intelligent Gemini AI architectures — open for high-impact software engineering roles and creative dev collaborations.
            </p>

            {/* The Two Action Buttons (Unified height, whitespace-nowrap, matching typography) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
              {/* Secondary Action: Back to Projects */}
              <TransitionLink
                href="/projects"
                className="group inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:border-[#D3FD50] hover:bg-[#D3FD50]/10 text-white hover:text-[#D3FD50] font-[font2] font-black text-base sm:text-lg tracking-wider uppercase whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
              >
                <FiArrowLeft className="text-xl transition-transform duration-300 group-hover:-translate-x-1 text-[#D3FD50]" />
                <span>RETURN TO WORK</span>
              </TransitionLink>

              {/* Primary Action: Connect on LinkedIn */}
              <a
                href="https://www.linkedin.com/in/gurjap-singh-8714a0301/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-4 rounded-full bg-[#D3FD50] hover:bg-white text-black font-[font2] font-black text-base sm:text-lg tracking-wider uppercase whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(211,253,80,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)]"
              >
                <span>CONNECT ON LINKEDIN</span>
                <span className="w-7 h-7 rounded-full bg-black/10 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                  <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Telemetry Info + Pure Text Names (No buttons, no icons, no top button) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-white/50">
          {/* Left Metadata */}
          <div className="flex items-center gap-3">
            <span>GURJAP SINGH © 2026</span>
            <span className="text-white/20">•</span>
            <span className="text-[#D3FD50]">PLAYGROUND LAB V2.4</span>
          </div>

          {/* Right: Just clean text names */}
          <div className="flex items-center gap-6 font-mono text-xs tracking-widest">
            <a
              href="https://github.com/hellman53"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-[#D3FD50] transition-colors"
            >
              GITHUB
            </a>
            <a
              href="https://www.linkedin.com/in/gurjap-singh-8714a0301/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-[#D3FD50] transition-colors"
            >
              LINKEDIN
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PlaygroundFooter;
