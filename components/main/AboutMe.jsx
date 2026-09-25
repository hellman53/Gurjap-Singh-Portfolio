"use client";

import React, { useEffect } from "react";
import { ScrollTrigger } from "gsap/all";
import AboutParallaxTicker from "@/components/about/AboutParallaxTicker";
import AchievementsList from "@/components/about/AchievementsList";
import WorkFooter from "@/components/work/WorkFooter";

const AboutMe = () => {
  useEffect(() => {
    // Unconditionally unlock page scrolling
    document.body.style.overflow = "auto";
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#111] text-white">
      {/* 1. Hero Section: Sticky Identity Card & Spaciously Spread Editorial Spread */}
      <section className="relative px-6 md:px-14 pt-28 md:pt-36 pb-28">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* Left Column: Pinned Pure Profile Card */}
          <div className="w-full sm:w-[50vw] lg:w-[32%] mx-auto lg:mx-0 lg:sticky lg:top-36 self-start z-20 shrink-0">
            <div className="relative w-full aspect-[4/5] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/20 shadow-2xl bg-neutral-900 select-none group transition-all duration-500 hover:border-[#D3FD50]/40">
              <img
                src="/profile.jpg"
                alt="Gurjap Singh"
                className="w-full h-full object-cover filter contrast-105 transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column: Beautifully Spread Name, Editorial Manifesto & K72 Pillars */}
          <div className="w-full lg:w-[68%] flex flex-col font-[font2]">
            {/* Top Context Ribbon */}
            <div className="pb-6 border-b border-white/15 flex items-center justify-between gap-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D3FD50] flex items-center gap-2">
                <span>( 01 )</span>
                <span>✦</span>
                <span>PHILOSOPHY & ARCHITECTURE</span>
              </span>
              <span className="text-xs font-mono tracking-widest text-white/40 uppercase hidden sm:inline-block">
                NEW DELHI ✦ UTC+05:30
              </span>
            </div>

            {/* Giant Spread Name Headline */}
            <div className="py-8 md:py-12 border-b border-white/15">
              <h1 className="text-[12vw] sm:text-[8.5vw] lg:text-[6.8vw] font-black uppercase leading-[0.9] tracking-tighter text-white font-[font2] select-none flex flex-wrap items-baseline gap-x-4 md:gap-x-6">
                <span>GURJAP</span>
                <span className="text-[#D3FD50]">SINGH.</span>
                <span className="text-xs md:text-sm font-mono font-normal tracking-widest text-white/50 border border-white/20 px-3.5 py-1 rounded-full uppercase self-center ml-2 hidden sm:inline-block">
                  CREATIVE DEV / 2026
                </span>
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs md:text-sm font-mono tracking-widest text-white/50 uppercase">
                <span className="text-white/80">SOFTWARE ARCHITECT</span>
                <span className="text-[#D3FD50]">✦</span>
                <span className="text-white/80">AI RESEARCHER</span>
                <span className="text-[#D3FD50]">✦</span>
                <span className="text-white/80">COMPETITIVE CODER</span>
              </div>
            </div>

            {/* Signature Spaciously Spread Editorial Manifesto */}
            <div className="py-10 md:py-14 border-b border-white/15">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-light leading-[1.28] tracking-tight text-white/95 font-[font1]">
                <span className="text-white font-medium">Curiosity fuels our engineering.</span> We stay humble and reject big egos. Real software is a <span className="text-[#D3FD50] underline decoration-[#D3FD50]/40 underline-offset-8">living system</span>—it has purpose, resilience, and an architectural story.
              </p>
              <p className="mt-8 text-base sm:text-lg md:text-xl font-light text-white/70 leading-relaxed max-w-3xl font-[font1]">
                If we ignore that, we might achieve quick numbers in the short term, but we compromise the system in the long run. We bring architectural perspective, algorithmic rigor, and AI capability to build products that make a lasting impact.
              </p>
            </div>

            {/* 4-Metric Credential & Impact Strip */}
            <div className="py-8 border-b border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 block mb-1">
                  01 / GLOBAL RANK
                </span>
                <div className="text-3xl sm:text-4xl font-black font-[font2] text-white">
                  #<span className="text-[#D3FD50]">123</span>
                </div>
                <span className="text-xs font-mono text-white/60">TCS CodeVita Global</span>
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 block mb-1">
                  02 / PRODUCTION
                </span>
                <div className="text-3xl sm:text-4xl font-black font-[font2] text-white">
                  15<span className="text-[#D3FD50]">+</span>
                </div>
                <span className="text-xs font-mono text-white/60">Full-Stack & AI Repos</span>
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 block mb-1">
                  03 / RESEARCH
                </span>
                <div className="text-3xl sm:text-4xl font-black font-[font2] text-white">
                  03<span className="text-[#D3FD50]">✦</span>
                </div>
                <span className="text-xs font-mono text-white/60">Papers & Conferences</span>
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 block mb-1">
                  04 / ALGORITHMS
                </span>
                <div className="text-3xl sm:text-4xl font-black font-[font2] text-white">
                  1.2K<span className="text-[#D3FD50]">+</span>
                </div>
                <span className="text-xs font-mono text-white/60">Problems Solved</span>
              </div>
            </div>

            {/* The 3 Signature K72 Craft Pillars */}
            <div className="py-12 border-b border-white/15 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              <div className="flex flex-col">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#D3FD50] mb-3">
                  01 / OUR CRAFT
                </span>
                <h3 className="font-[font2] font-black text-xl uppercase mb-3 text-white">
                  Our Engineering.
                </h3>
                <p className="text-sm font-sans text-white/70 leading-relaxed font-light">
                  Born in curiosity, raised on technical discipline, and powered by modern full-stack architectures. Built for speed, reliability, and long-term scale.
                </p>
              </div>

              <div className="flex flex-col">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#D3FD50] mb-3">
                  02 / OUR FUTURE
                </span>
                <h3 className="font-[font2] font-black text-xl uppercase mb-3 text-[#D3FD50]">
                  Our AI & Systems.
                </h3>
                <p className="text-sm font-sans text-white/70 leading-relaxed font-light">
                  Publishing peer-reviewed research and integrating intelligent agentic workflows and LLMs into daily development to build software that thinks ahead.
                </p>
              </div>

              <div className="flex flex-col">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#D3FD50] mb-3">
                  03 / OUR CODE
                </span>
                <h3 className="font-[font2] font-black text-xl uppercase mb-3 text-white">
                  Our Discipline.
                </h3>
                <p className="text-sm font-sans text-white/70 leading-relaxed font-light">
                  Ranked #123 globally in TCS CodeVita. Algorithmic thinking, clean problem decomposition, and mathematically sound logic applied to every repository we build.
                </p>
              </div>
            </div>

            {/* Domains of Architectural Capabilities Matrix */}
            <div className="pt-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D3FD50] block mb-5">
                ✦ DOMAINS OF ARCHITECTURAL EXPERTISE
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.015] hover:border-white/25 transition-colors">
                  <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>FULL-STACK WEB SYSTEMS</span>
                    <span className="text-[#D3FD50]">01</span>
                  </h4>
                  <p className="text-xs font-mono text-white/60 leading-relaxed">
                    Next.js 15 App Router, React 19, Node.js, Express, Microservices, PostgreSQL, MongoDB, Redis, WebSockets, TailwindCSS.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.015] hover:border-white/25 transition-colors">
                  <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>APPLIED AI & AGENTS</span>
                    <span className="text-[#D3FD50]">02</span>
                  </h4>
                  <p className="text-xs font-mono text-white/60 leading-relaxed">
                    PyTorch, Large Language Model Integration, Multi-Agent Architectures, Vector Embeddings, LangChain, RAG Systems, OpenCV.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.015] hover:border-white/25 transition-colors">
                  <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>ALGORITHMIC RIGOR</span>
                    <span className="text-[#D3FD50]">03</span>
                  </h4>
                  <p className="text-xs font-mono text-white/60 leading-relaxed">
                    Competitive Programming (CodeVita #123), Advanced Data Structures, Graph Theory, Dynamic Programming, Time Complexity Optimization.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.015] hover:border-white/25 transition-colors">
                  <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>CLOUD, DEVOPS & MOTION</span>
                    <span className="text-[#D3FD50]">04</span>
                  </h4>
                  <p className="text-xs font-mono text-white/60 leading-relaxed">
                    Docker, Cloud Architecture, CI/CD Workflows, GSAP High-Performance Motion, WebGL Canvas, System Security Audits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Giant Horizontal Parallax Ticker with Center Card */}
      <AboutParallaxTicker />

      {/* 3. The Signature K72 Interactive Achievements Hover-Swap List */}
      <AchievementsList />

      {/* 4. Unified Agency Footer */}
      <WorkFooter />
    </div>
  );
};

export default AboutMe;
