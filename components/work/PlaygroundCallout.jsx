"use client";

import React from "react";
import TransitionLink from "@/components/common/TransitionLink";
import { FiArrowUpRight } from "react-icons/fi";
import { IoGameControllerOutline, IoSparklesOutline } from "react-icons/io5";

const PlaygroundCallout = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-14 py-16 md:py-24">
      <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border border-white/15 bg-gradient-to-br from-neutral-900/90 via-[#0d0d0d] to-black p-8 sm:p-12 md:p-16 transition-all duration-500 hover:border-[#D3FD50]/50 group shadow-2xl">
        {/* Ambient Neon Glow Corner */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#D3FD50]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#D3FD50]/20 transition-all duration-700" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="flex flex-col gap-4 max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border border-[#D3FD50]/30 bg-[#D3FD50]/10 text-xs font-mono uppercase tracking-widest text-[#D3FD50]">
              <IoSparklesOutline className="animate-spin text-sm" style={{ animationDuration: "6s" }} />
              <span>THE EXPERIMENTAL LAB</span>
            </div>

            {/* Headline */}
            <h2 className="font-[font2] font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-none">
              WANT TO SEE THE CODE <br />
              <span className="text-[#D3FD50]">IN ACTION?</span>
            </h2>

            {/* Description */}
            <p className="font-mono text-xs sm:text-sm text-white/70 uppercase tracking-widest leading-relaxed pt-2">
              Dive into the Playground — an interactive laboratory featuring Zero-Gravity Physics, the Beat The AI Refactor challenge, a 3D Holographic Quantum Core, Retro Hacker CLI, and a live Audio Synthesizer.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 pt-3">
              {[
                "Zero-G Physics Sandbox",
                "Beat The AI Mini-Game",
                "3D Three.js Core",
                "Retro CRT Hacker CLI",
                "Web Audio Synth",
                "3D Tic-Tac-Toe Arena",
              ].map((feat) => (
                <span
                  key={feat}
                  className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono tracking-wider text-white/80"
                >
                  ✦ {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Big Interactive Action Button */}
          <div className="shrink-0 flex flex-col items-start lg:items-end gap-3">
            <TransitionLink
              href="/playground"
              className="inline-flex items-center gap-4 px-8 sm:px-10 py-5 rounded-full bg-[#D3FD50] text-black font-[font2] font-black text-lg sm:text-xl tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-[0_0_35px_rgba(211,253,80,0.5)] active:scale-95"
            >
              <IoGameControllerOutline className="text-2xl" />
              <span>LAUNCH PLAYGROUND</span>
              <FiArrowUpRight className="text-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </TransitionLink>
            <span className="text-[11px] font-mono tracking-widest text-white/40 uppercase">
              100% In-Browser • 60 FPS • No Setup
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaygroundCallout;
