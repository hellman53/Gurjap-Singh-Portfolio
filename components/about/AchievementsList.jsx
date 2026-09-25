"use client";

import React, { useState } from "react";
import { achievementsData } from "@/data/achievementsData";
import CertificateModal from "./CertificateModal";

const AchievementsList = () => {
  const defaultImage = "/profile.jpg";
  const [activeImage, setActiveImage] = useState(defaultImage);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  return (
    <section className="relative w-full bg-black text-white py-24 md:py-36 px-6 md:px-14 border-t border-white/15">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/15 pb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#D3FD50] block mb-2">
            ✦ TRACK RECORD & CREDENTIALS
          </span>
          <h2 className="font-[font2] font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white leading-none">
            HONORS & <br />
            <span className="text-[#D3FD50]">ACHIEVEMENTS.</span>
          </h2>
        </div>
        <p className="max-w-md font-mono text-xs sm:text-sm text-white/60 uppercase tracking-widest leading-relaxed">
          Hover over any recognition to inspect its official verified credential. Click to view high-resolution verification.
        </p>
      </div>

      <div className="max-w-7xl mx-auto relative flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
        {/* Pinned Left Certificate / Photo Card (Sticks cleanly during scroll through all achievements) */}
        <div className="w-full lg:w-[35%] lg:sticky lg:top-36 self-start flex flex-col items-center z-20 shrink-0">
          <div className={`relative w-[70vw] sm:w-[50vw] lg:w-full max-w-[380px] aspect-[4/5] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border bg-neutral-900 shadow-2xl transition-all duration-300 ${
            activeImage !== defaultImage
              ? "border-[#D3FD50]/60 shadow-[0_0_30px_rgba(211,253,80,0.18)]"
              : "border-white/20"
          }`}>
            <img
              key={activeImage}
              src={activeImage}
              alt="Achievement certificate preview"
              className="w-full h-full object-cover select-none transition-all duration-300 animate-fadein filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[11px] font-mono tracking-widest text-white/90 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
              <span className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${activeImage !== defaultImage ? "bg-[#D3FD50] animate-ping" : "bg-white/40"}`} />
                {activeImage !== defaultImage ? "VERIFIED CREDENTIAL" : "GURJAP SINGH"}
              </span>
              <span className="text-[#D3FD50]">✦</span>
            </div>
          </div>
          <span className="mt-4 text-[11px] font-mono tracking-widest text-white/40 uppercase text-center">
            {activeImage !== defaultImage ? "Click to view full credential" : "Hover row to preview credential"}
          </span>
        </div>

        {/* Stacked Interactive Rows (Matches K72 Team List Hover-Swap) */}
        <div className="w-full lg:w-[65%] flex flex-col border-t border-white/20 z-10">
          {achievementsData.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setActiveImage(item.image)}
              onMouseLeave={() => setActiveImage(defaultImage)}
              onClick={() => setSelectedCertificate(item)}
              className="group relative w-full border-b border-white/20 px-4 sm:px-6 py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer transition-colors duration-150 select-none hover:bg-[#D3FD50]"
            >
              {/* Left Column: Category */}
              <div className="w-full md:w-1/3">
                <span className="font-mono text-xs uppercase tracking-widest text-white/50 group-hover:text-black font-semibold transition-colors duration-150">
                  {item.category}
                </span>
              </div>

              {/* Right Column: Title & Badge */}
              <div className="w-full md:w-2/3 flex items-center justify-between gap-4">
                <h3 className="font-[font2] font-black text-xl sm:text-2xl md:text-3xl uppercase tracking-tight text-white group-hover:text-black transition-colors duration-150">
                  {item.title}
                </h3>
                <span className="text-xs font-mono text-white/40 group-hover:text-black shrink-0 hidden sm:inline-block transition-colors duration-150">
                  {item.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal on Click */}
      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </section>
  );
};

export default AchievementsList;
