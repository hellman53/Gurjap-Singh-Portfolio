"use client";

import React, { useState, useEffect } from "react";
import { IoSparklesOutline, IoPulseOutline } from "react-icons/io5";

const PlaygroundHero = ({ activeTab, setActiveTab }) => {
  const [fps, setFps] = useState(60);

  // Live lightweight FPS counter for cybernetic telemetry realism
  useEffect(() => {
    let lastTime = performance.now();
    let frames = 0;
    let animId;

    const measure = (now) => {
      frames++;
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frames * 1000) / (now - lastTime))));
        frames = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measure);
    };

    animId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(animId);
  }, []);

  const tabs = [
    { id: "all", label: "ALL EXPERIMENTS" },
    { id: "physics", label: "01. ZERO-G PHYSICS" },
    { id: "game", label: "02. BEAT THE AI" },
    { id: "3d", label: "03. 3D QUANTUM CORE" },
    { id: "terminal", label: "04. HACKER CLI" },
    { id: "synth", label: "05. AUDIO SYNTH" },
    { id: "tictactoe", label: "06. NEON TIC-TAC-TOE" },
  ];

  return (
    <section className="pt-28 md:pt-36 pb-10 px-6 md:px-14 border-b border-white/15">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Top Telemetry Ticker */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono tracking-widest uppercase text-white/50 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-[#D3FD50] font-bold">
              LAB_SYSTEM: ONLINE
            </span>
            <span className="text-white/20">|</span>
            <span className="hidden sm:inline">TURBOPACK 16 + REACT 19</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-white/80">
              <IoPulseOutline className="text-base text-[#D3FD50]" />
              <span>REFRESH: <strong className="text-[#D3FD50]">{fps} FPS</strong></span>
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-1.5 text-[#D3FD50]">
              <IoSparklesOutline className="animate-spin text-sm" style={{ animationDuration: "5s" }} />
              <span>6 LAB UNITS</span>
            </div>
          </div>
        </div>

        {/* Hero Title */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D3FD50] block mb-2">
              EXPERIMENTAL DIGITAL LABORATORY
            </span>
            <h1 className="font-[font2] font-black text-[15vw] sm:text-[13vw] md:text-[11vw] uppercase leading-none tracking-tighter text-white select-none">
              PLAY<span className="text-[#D3FD50]">GROUND</span>
            </h1>
          </div>
          <div className="max-w-md font-mono text-xs sm:text-sm text-white/70 uppercase tracking-widest leading-relaxed">
            <p>
              An interactive proving ground of 3D WebGL renders, physics simulations, AI speed games, and creative audio synthesizers engineered by Gurjap Singh.
            </p>
          </div>
        </div>

        {/* Filter Navigation Tabs (Padding prevents active button scale and glow from clipping at the start) */}
        <div className="flex items-center gap-3 overflow-x-auto p-3 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#D3FD50] text-black font-bold shadow-[0_0_20px_rgba(211,253,80,0.3)] scale-105"
                    : "border border-white/15 bg-white/5 text-white/70 hover:border-white/40 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlaygroundHero;
