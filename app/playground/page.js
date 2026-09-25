"use client";

import React, { useState } from "react";
import PlaygroundHero from "@/components/playground/PlaygroundHero";
import PhysicsSandbox from "@/components/playground/PhysicsSandbox";
import BeatTheAiGame from "@/components/playground/BeatTheAiGame";
import HolographicQuantumCore from "@/components/playground/HolographicQuantumCore";
import HackerTerminal from "@/components/playground/HackerTerminal";
import AudioVisualSynth from "@/components/playground/AudioVisualSynth";
import PlaygroundFooter from "@/components/playground/PlaygroundFooter";

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="w-full min-h-screen bg-[#080808] text-white">
      {/* 1. Header with Live Telemetry & Filters */}
      <PlaygroundHero activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Main Experiments Section */}
      <main className="max-w-7xl mx-auto px-6 md:px-14 py-16 md:py-24 flex flex-col gap-24 md:gap-32">
        {/* Experiment 01: Zero-G Physics Sandbox */}
        {(activeTab === "all" || activeTab === "physics") && (
          <section className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/15 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#D3FD50] block">
                  ✦ EXPERIMENT 01 // 2D/3D RIGID BODY PHYSICS
                </span>
                <h2 className="font-[font2] font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-none mt-1">
                  ZERO-GRAVITY TECH SANDBOX
                </h2>
              </div>
              <p className="max-w-md font-mono text-xs text-white/60 uppercase tracking-widest leading-relaxed">
                Click, drag, and fling floating tech badges. Switch physics modes between Zero-G, Earth, Inverted, and Black Hole vortex.
              </p>
            </div>
            <PhysicsSandbox />
          </section>
        )}

        {/* Experiment 02: Beat The AI Refactor Mini-Game */}
        {(activeTab === "all" || activeTab === "game") && (
          <section className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/15 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#D3FD50] block">
                  ✦ EXPERIMENT 02 // SPEED CODING MINI-GAME
                </span>
                <h2 className="font-[font2] font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-none mt-1">
                  BEAT THE AI REFACTOR
                </h2>
              </div>
              <p className="max-w-md font-mono text-xs text-white/60 uppercase tracking-widest leading-relaxed">
                Spot code bugs and anti-patterns within 10 seconds before the Gemini AI AST engine refactors the snippet!
              </p>
            </div>
            <BeatTheAiGame />
          </section>
        )}

        {/* Experiment 03: 3D Holographic Quantum Core */}
        {(activeTab === "all" || activeTab === "3d") && (
          <section className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/15 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#D3FD50] block">
                  ✦ EXPERIMENT 03 // THREE.JS WEBGL RENDER
                </span>
                <h2 className="font-[font2] font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-none mt-1">
                  3D HOLOGRAPHIC QUANTUM CORE
                </h2>
              </div>
              <p className="max-w-md font-mono text-xs text-white/60 uppercase tracking-widest leading-relaxed">
                Interactive rotating 3D silicon processor die with particle flux. Control clock frequency, particle speed, and neon glow palette.
              </p>
            </div>
            <HolographicQuantumCore />
          </section>
        )}

        {/* Experiment 04: Retro Hacker CLI Terminal */}
        {(activeTab === "all" || activeTab === "terminal") && (
          <section className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/15 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#D3FD50] block">
                  ✦ EXPERIMENT 04 // RETRO CRT COMMAND LINE
                </span>
                <h2 className="font-[font2] font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-none mt-1">
                  HACKER CLI TERMINAL
                </h2>
              </div>
              <p className="max-w-md font-mono text-xs text-white/60 uppercase tracking-widest leading-relaxed">
                Type commands like &apos;help&apos;, &apos;skills --bench&apos;, &apos;matrix&apos;, or &apos;game&apos; to unlock easter eggs, benchmarks, and ASCII games.
              </p>
            </div>
            <HackerTerminal />
          </section>
        )}

        {/* Experiment 05: Audio-Visual Synthesizer */}
        {(activeTab === "all" || activeTab === "synth") && (
          <section className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/15 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#D3FD50] block">
                  ✦ EXPERIMENT 05 // WEB AUDIO API & LIVE FFT
                </span>
                <h2 className="font-[font2] font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-none mt-1">
                  AUDIO-VISUAL SYNTHESIZER
                </h2>
              </div>
              <p className="max-w-md font-mono text-xs text-white/60 uppercase tracking-widest leading-relaxed">
                Move your cursor to modulate pentatonic musical chords and sweep resonant filters with a live canvas audio oscilloscope.
              </p>
            </div>
            <AudioVisualSynth />
          </section>
        )}
      </main>

      {/* 3. K72 Style Lab Footer */}
      <PlaygroundFooter />
    </div>
  );
}
